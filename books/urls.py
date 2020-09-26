from django.urls import path

from . import views2

urlpatterns = [
	path('', views2.book_list, name='book_list'),
	path('view/<int:pk>', views2.book_view, name='book_view'),
	path('new',views2.book_create,name='book_new'),
	path('edit/<int:pk>', views2.book_update, name='book_edit'),
	path('delete/<int:pk>', views2.book_delete, name='book_delete'),
]