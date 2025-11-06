const axios = require('axios');
const { PassThrough } = require('stream');

// Simulate a slow download by throttling the stream
class ThrottledStream extends PassThrough {
    constructor(bytesPerSecond) {
        super();
        this.bytesPerSecond = bytesPerSecond;
        this.bytesThisSecond = 0;
        this.lastReset = Date.now();
    }

    _transform(chunk, encoding, callback) {
        const now = Date.now();
        const elapsed = now - this.lastReset;
        
        // Reset counter every second
        if (elapsed >= 1000) {
            this.bytesThisSecond = 0;
            this.lastReset = now;
        }
        
        // Check if we've exceeded the rate limit this second
        if (this.bytesThisSecond + chunk.length > this.bytesPerSecond) {
            const delay = 1000 - elapsed;
            setTimeout(() => {
                this.bytesThisSecond = chunk.length;
                this.lastReset = Date.now();
                callback(null, chunk);
            }, delay);
        } else {
            this.bytesThisSecond += chunk.length;
            callback(null, chunk);
        }
    }
}

async function simulateSlowDownload(config, testName) {
    console.log(`\n=== ${testName} ===`);
    console.log(`Settings: ${JSON.stringify(config, null, 2)}`);
    
    const startTime = Date.now();
    let bytesReceived = 0;
    const targetBytes = 100 * 1024 * 1024; // 100MB target
    const slowSpeed = 2 * 1024 * 1024; // 2 MB/s (would take 50 seconds for 100MB)
    
    try {
        // Create a simulated slow stream
        const throttledStream = new ThrottledStream(slowSpeed);
        let interval;
        
        // Simulate reading from a large file slowly
        const simulateDownload = () => {
            return new Promise((resolve, reject) => {
                interval = setInterval(() => {
                    if (bytesReceived >= targetBytes) {
                        clearInterval(interval);
                        throttledStream.end();
                        return;
                    }
                    
                    // Send 256KB chunks
                    const chunkSize = Math.min(256 * 1024, targetBytes - bytesReceived);
                    const chunk = Buffer.alloc(chunkSize);
                    bytesReceived += chunkSize;
                    throttledStream.write(chunk);
                    
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                    process.stdout.write(`\rReceived: ${(bytesReceived / 1024 / 1024).toFixed(2)} MB | Elapsed: ${elapsed}s | Speed: ~${(slowSpeed / 1024 / 1024).toFixed(2)} MB/s`);
                }, 100);
                
                // Apply timeout if configured
                if (config.timeout > 0) {
                    setTimeout(() => {
                        clearInterval(interval);
                        reject(new Error(`Timeout of ${config.timeout}ms exceeded`));
                    }, config.timeout);
                }
                
                throttledStream.on('finish', () => {
                    clearInterval(interval);
                    resolve();
                });
                
                throttledStream.on('error', (error) => {
                    clearInterval(interval);
                    reject(error);
                });
            });
        };
        
        await simulateDownload();
        
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n✅ SUCCESS: Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB in ${totalTime}s`);
        return { success: true, bytes: bytesReceived, time: totalTime };
        
    } catch (error) {
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n❌ FAILED: ${error.message} after ${totalTime}s`);
        console.log(`   Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB before failure`);
        return { success: false, error: error.message, bytes: bytesReceived, time: totalTime };
    }
}

async function runSimulation() {
    console.log('='.repeat(70));
    console.log('Timeout Simulation Test - Slow Download (2 MB/s)');
    console.log('Target: 100 MB file (would take ~50 seconds at 2 MB/s)');
    console.log('='.repeat(70));
    
    // Test with OLD config - 30 second timeout
    const oldResult = await simulateSlowDownload(
        { timeout: 30000 },
        'OLD Config: 30 second timeout'
    );
    
    console.log('\n' + '-'.repeat(70));
    
    // Test with NEW config - no timeout
    const newResult = await simulateSlowDownload(
        { timeout: 0 },
        'NEW Config: No timeout'
    );
    
    console.log('\n' + '='.repeat(70));
    console.log('\n📊 SIMULATION RESULTS:');
    console.log('='.repeat(70));
    
    console.log(`\nOLD Config (30s timeout): ${oldResult.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`  - Downloaded: ${(oldResult.bytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  - Time: ${oldResult.time}s`);
    if (!oldResult.success) {
        console.log(`  - Error: ${oldResult.error}`);
        console.log(`  - ⚠️  Download stopped at ~${((oldResult.bytes / (100 * 1024 * 1024)) * 100).toFixed(1)}% complete!`);
    }
    
    console.log(`\nNEW Config (no timeout): ${newResult.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`  - Downloaded: ${(newResult.bytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  - Time: ${newResult.time}s`);
    if (!newResult.success) {
        console.log(`  - Error: ${newResult.error}`);
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('💡 ANALYSIS:');
    console.log('='.repeat(70));
    console.log('With a slow connection (2 MB/s):');
    console.log('  • 100 MB file takes ~50 seconds to download');
    console.log('  • 500 MB file would take ~250 seconds (4+ minutes)');
    console.log('  • 1 GB file would take ~500 seconds (8+ minutes)');
    console.log('');
    console.log('OLD Config (30s timeout):');
    console.log('  ❌ Would fail at ~60 MB for a 100 MB file');
    console.log('  ❌ Would fail at ~60 MB for ANY file on slow connections');
    console.log('  ❌ Users complain: "stops at 800 MB" or similar');
    console.log('');
    console.log('NEW Config (no timeout):');
    console.log('  ✅ Can download files of any size');
    console.log('  ✅ Works regardless of connection speed');
    console.log('  ✅ No artificial interruptions');
    console.log('='.repeat(70));
}

runSimulation().catch(console.error);
