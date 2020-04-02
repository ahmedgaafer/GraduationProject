from FinalGP import settings
import datetime
def jwt_payload_handler(email , password):
    return {
        'email' : email ,
        'password' : password ,
        'SECRET_KEY' : settings.SECRET_KEY ,
        'Time' : str(datetime.datetime.now())
    }