from config import test_db_connection

def execute_query(query, params=None, fetch=False, fetch_one=False):
    
    conn = test_db_connection()
    if not conn:
        print(" No connection available.")
        return None

    result = None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query, params)

        if fetch:
            if fetch_one:
                result = cursor.fetchone()
            else:
                result = cursor.fetchall()
        else:
            conn.commit()
            print(" Query executed successfully")
    except Exception as e:
        print(" Query failed:", e)
    finally:
        if cursor:
            cursor.close()
        if conn.is_connected():
            conn.close()

    return result


def insert_record(table, data_dict):
    cols = ', '.join(data_dict.keys())
    vals = ', '.join(['%s'] * len(data_dict))
    query = f"INSERT INTO {table} ({cols}) VALUES ({vals})"
    execute_query(query, tuple(data_dict.values()))


def update_record(table, data_dict, where_column, where_value):
    set_clause = ', '.join([f"{k} = %s" for k in data_dict.keys()])
    query = f"UPDATE {table} SET {set_clause} WHERE {where_column} = %s"
    execute_query(query, tuple(data_dict.values()) + (where_value,))


def fetch_all_records(table):
    return execute_query(f"SELECT * FROM {table}", fetch=True)


def fetch_record_by_id(table, id_col, record_id):
    query = f"SELECT * FROM {table} WHERE {id_col} = %s"
    return execute_query(query, (record_id,), fetch=True, fetch_one=True)
