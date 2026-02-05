import socketio
from typing import List

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[
    'http://localhost:5173', 'http://127.0.0.1:5173',
    'http://localhost:5174', 'http://127.0.0.1:5174',
    'http://localhost:5175', 'http://127.0.0.1:5175',
    'http://localhost:5176', 'http://127.0.0.1:5176',
    '*' # Allow all for development ease if strictly needed, but listing common ones is safer. Let's add '*' for dev convenience as requested "connect everything".
])
socket_app = socketio.ASGIApp(sio, socketio_path='')

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def subscribe_to_stock(sid):
    await sio.enter_room(sid, 'stock_updates')

@sio.event
async def subscribe_to_alerts(sid):
    await sio.enter_room(sid, 'emergency_alerts')

async def broadcast_stock_update(data):
    await sio.emit('stock_update', data, room='stock_updates')

async def broadcast_emergency(data):
    await sio.emit('emergency_alert', data, room='emergency_alerts')
