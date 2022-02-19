const uuid4 = require('uuid4');
const jwt = require('jsonwebtoken');

app_access_key = '62067c0e71bd215ae0421074';
app_secret = 'HRKA9KNHEB1y54C2sYPIm6OYhXCkay_wBbWYsZeI_33ezLnPADhRqkVTHRlHFBtRwvv5afoQD55rmEfHMhOQAyTKhkQ725tbIgj0o1SsFOu6Sp1hk4LH8ihjP_PZw4B0924FZLhUsRTv7hs6a8YtZNnOLofW_Q5uJymDiPkOOg8=';

class HMS{
    


    managementToken(){
        return jwt.sign(
            {
                access_key: app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000)
            },
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '24h',
                jwtid: uuid4()
            },
            function (err, token) {
                console.log(token);
            }
        );
    }

    appToken(room_id="62067c2f71bd215ae0421078",user_id="123456",role="host"){
        var payload = {
            access_key: app_access_key,
            room_id: room_id,
            user_id: user_id,
            role: role,
            type: 'app',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        };
        return jwt.sign(
            payload,
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '24h',
                jwtid: uuid4()
            },
        );        
    }
}

module.exports = HMS;