// Test demo account creation
const testDemoAccount = async () => {
  try {
    console.log('Testing demo account creation...');
    
    // First, try to create the demo account via Firebase Auth
    const registerResponse = await fetch('http://localhost:3000/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // This would typically be a Firebase ID token, but let's test the endpoint first
      })
    });
    
    console.log('Register response status:', registerResponse.status);
    const registerData = await registerResponse.text();
    console.log('Register response:', registerData);
    
  } catch (error) {
    console.error('Test error:', error);
  }
};

testDemoAccount();