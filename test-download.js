const axios = require('axios');

// Test configuration
const testUrl = 'https://bcdnw.hakunaymatata.com/resource/d458676bebce12788e93bc133178baf5.mp4?sign=3d07b75d7c2e6072a9d8e76a57c00f77&t=1762371259';

async function testOldConfig() {
    console.log('\n=== Testing OLD Configuration ===');
    console.log('Settings: timeout=30000ms, default maxContentLength');
    
    const startTime = Date.now();
    let bytesReceived = 0;
    
    try {
        const response = await axios({
            method: 'GET',
            url: testUrl,
            responseType: 'stream',
            timeout: 30000, // OLD: 30 second timeout
            // OLD: No maxContentLength/maxBodyLength set (uses defaults)
            headers: {
                'User-Agent': 'okhttp/4.12.0',
                'Referer': 'https://fmoviesunblocked.net/',
                'Origin': 'https://fmoviesunblocked.net'
            }
        });
        
        console.log(`Status: ${response.status}`);
        console.log(`Content-Length: ${response.headers['content-length']} bytes`);
        console.log(`Content-Type: ${response.headers['content-type']}`);
        
        return new Promise((resolve, reject) => {
            response.data.on('data', (chunk) => {
                bytesReceived += chunk.length;
                const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                process.stdout.write(`\rReceived: ${(bytesReceived / 1024 / 1024).toFixed(2)} MB | Elapsed: ${elapsed}s`);
            });
            
            response.data.on('end', () => {
                const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(`\n✅ SUCCESS: Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB in ${totalTime}s`);
                resolve({ success: true, bytes: bytesReceived, time: totalTime });
            });
            
            response.data.on('error', (error) => {
                const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(`\n❌ FAILED: ${error.message} after ${totalTime}s`);
                console.log(`   Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB before failure`);
                reject({ success: false, error: error.message, bytes: bytesReceived, time: totalTime });
            });
        });
    } catch (error) {
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n❌ REQUEST FAILED: ${error.message} after ${totalTime}s`);
        console.log(`   Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB before failure`);
        return { success: false, error: error.message, bytes: bytesReceived, time: totalTime };
    }
}

async function testNewConfig() {
    console.log('\n=== Testing NEW Configuration ===');
    console.log('Settings: timeout=0 (disabled), maxContentLength=Infinity, maxBodyLength=Infinity');
    
    const startTime = Date.now();
    let bytesReceived = 0;
    
    try {
        const response = await axios({
            method: 'GET',
            url: testUrl,
            responseType: 'stream',
            timeout: 0, // NEW: No timeout
            maxContentLength: Infinity, // NEW: No size limit
            maxBodyLength: Infinity, // NEW: No size limit
            headers: {
                'User-Agent': 'okhttp/4.12.0',
                'Referer': 'https://fmoviesunblocked.net/',
                'Origin': 'https://fmoviesunblocked.net'
            }
        });
        
        console.log(`Status: ${response.status}`);
        console.log(`Content-Length: ${response.headers['content-length']} bytes`);
        console.log(`Content-Type: ${response.headers['content-type']}`);
        
        return new Promise((resolve, reject) => {
            response.data.on('data', (chunk) => {
                bytesReceived += chunk.length;
                const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                process.stdout.write(`\rReceived: ${(bytesReceived / 1024 / 1024).toFixed(2)} MB | Elapsed: ${elapsed}s`);
            });
            
            response.data.on('end', () => {
                const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(`\n✅ SUCCESS: Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB in ${totalTime}s`);
                resolve({ success: true, bytes: bytesReceived, time: totalTime });
            });
            
            response.data.on('error', (error) => {
                const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(`\n❌ FAILED: ${error.message} after ${totalTime}s`);
                console.log(`   Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB before failure`);
                reject({ success: false, error: error.message, bytes: bytesReceived, time: totalTime });
            });
        });
    } catch (error) {
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n❌ REQUEST FAILED: ${error.message} after ${totalTime}s`);
        console.log(`   Downloaded ${(bytesReceived / 1024 / 1024).toFixed(2)} MB before failure`);
        return { success: false, error: error.message, bytes: bytesReceived, time: totalTime };
    }
}

async function runComparison() {
    console.log('='.repeat(60));
    console.log('Download Configuration Comparison Test');
    console.log('='.repeat(60));
    console.log('\nThis test will download a video file with both configurations');
    console.log('to compare timeout and size limit handling.\n');
    
    const oldResult = await testOldConfig();
    console.log('\n' + '-'.repeat(60));
    
    const newResult = await testNewConfig();
    console.log('\n' + '='.repeat(60));
    
    console.log('\n📊 COMPARISON RESULTS:');
    console.log('='.repeat(60));
    console.log(`OLD Config: ${oldResult.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`  - Downloaded: ${(oldResult.bytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  - Time: ${oldResult.time}s`);
    if (!oldResult.success) {
        console.log(`  - Error: ${oldResult.error}`);
    }
    
    console.log(`\nNEW Config: ${newResult.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`  - Downloaded: ${(newResult.bytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  - Time: ${newResult.time}s`);
    if (!newResult.success) {
        console.log(`  - Error: ${newResult.error}`);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('💡 Key Differences:');
    console.log('OLD: timeout=30000ms - Will fail if download takes >30 seconds');
    console.log('OLD: Default limits - May fail on very large files');
    console.log('NEW: timeout=0 - No time limit, can download indefinitely');
    console.log('NEW: Infinite limits - No size restrictions');
    console.log('='.repeat(60));
}

runComparison().catch(console.error);
