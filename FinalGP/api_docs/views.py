import coreapi
from rest_framework import response, permissions
from rest_framework.decorators import api_view, renderer_classes , permission_classes
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
from rest_framework.permissions import BasePermission

@api_view()
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
@permission_classes([permissions.AllowAny])
def schema_view(request):
    schema = coreapi.Document(
        url='http://127.0.0.1:8000/',
        title='IBDD Documentation',
        content={
            'accounts': {
                'Login': coreapi.Link(
                url='/api/auth/login/',
                action='post',
                description='Login API',
                fields=[
                    coreapi.Field(name='email' , required=True , type='string' , location='form' , description='Email') ,
                    coreapi.Field(name='password', required=True, type='string',   location='form' ,description='Password'),
                ]),
                'Register':coreapi.Link(
                    url='/api/auth/register/' ,
                    action='post',
                    description='Register API',
                    fields=[
                        coreapi.Field(name='firstname', required=True, type='string', location='form',description='Firstname'),
                        coreapi.Field(name='lastname', required=True, type='string', location='form',
                                      description='LastName'),
                        coreapi.Field(name='email', required=True, type='string', location='form',
                                      description='Email'),
                        coreapi.Field(name='password', required=True, type='string', location='form',
                                      description='Password'),

                        coreapi.Field(name='status', required=True, type='string', location='form',
                                      description='Status'),
                    ]
                )
            },

        }

    )
    return response.Response(schema)