from FinalGP import settings
import datetime
def jwt_payload_handler(username , password):
    return {
        'username' : username ,
        'password' : password ,
        'SECRET_KEY' : settings.SECRET_KEY ,
        'Time' : str(datetime.datetime.now())
    }