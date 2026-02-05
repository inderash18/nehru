import requests
import json

# Test backend connection
print("🔍 Testing LifeLink Backend Connection...\n")

BASE_URL = "http://localhost:8000"

# Test 1: Check if backend is running
print("1. Testing backend server...")
try:
    response = requests.get(f"{BASE_URL}/")
    if response.status_code == 200:
        print("   ✅ Backend is running!")
        print(f"   Response: {response.json()}\n")
    else:
        print(f"   ❌ Backend returned status code: {response.status_code}\n")
except Exception as e:
    print(f"   ❌ Backend is not running: {e}\n")
    print("   💡 Start backend with: python -m uvicorn app.main:app --reload --port 8000\n")
    exit(1)

# Test 2: Test registration endpoint
print("2. Testing user registration...")
test_user = {
    "full_name": "Test User",
    "email": "test@lifelink.com",
    "password": "testpass123",
    "phone": "+91 9876543210",
    "blood_type": "O+",
    "address": {
        "city": "Mumbai",
        "state": "Maharashtra"
    },
    "role": "donor"
}

try:
    response = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
    if response.status_code == 200:
        print("   ✅ Registration successful!")
        print(f"   User created: {response.json().get('email')}\n")
    elif response.status_code == 400:
        print("   ⚠️  User already exists (this is okay for testing)\n")
    else:
        print(f"   ❌ Registration failed: {response.status_code}")
        print(f"   Error: {response.text}\n")
except Exception as e:
    print(f"   ❌ Registration test failed: {e}\n")

# Test 3: Test login endpoint
print("3. Testing user login...")
login_data = {
    "username": "test@lifelink.com",
    "password": "testpass123"
}

try:
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    if response.status_code == 200:
        token = response.json().get('access_token')
        print("   ✅ Login successful!")
        print(f"   Token received: {token[:20]}...\n")
    else:
        print(f"   ❌ Login failed: {response.status_code}")
        print(f"   Error: {response.text}\n")
except Exception as e:
    print(f"   ❌ Login test failed: {e}\n")

print("=" * 50)
print("✨ Backend testing complete!")
print("=" * 50)
print("\n📝 Next steps:")
print("1. Open MongoDB Compass")
print("2. Connect to: mongodb://localhost:27017")
print("3. Navigate to: blood_donation_db → users")
print("4. You should see the test user data!")
