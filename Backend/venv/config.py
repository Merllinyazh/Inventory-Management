import mysql.connector
from mysql.connector import Error

def test_db_connection():
   
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='inventory',
            password='merllin@2005',
            database='inven_db'
        )
        if conn.is_connected():
            print(" Connected to inven_db")
            return conn
    except Error as e:
        print(f" Database connection failed: {e}")
        return None
    
    
