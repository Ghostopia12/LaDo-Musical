from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)

    # @api_view(['GET'])
    # @authentication_classes([TokenAuthentication])
    # @action(detail=False, methods=['get'], url_path='current_user', name="current_user")
    # def current_user(request):
    #     user = request.user
    #     return Response({'user_id': user.id, 'username': user.username, 'is_admin': user.is_superuser})

    # @api_view(['GET'])
    # @authentication_classes([TokenAuthentication])
    # @action(detail=False, methods=['get'], url_path='current_user', name="usuario actual")
    # def my_view(self, request, pk=None):
    #     user = request.user
    #     return Response({'user_id': user})
