from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from . import views

app_name = "APP"

urlpatterns = [
    path("", views.IndexListView.as_view(), name="index"),
    path("index.html", views.IndexListView.as_view(), name="index"),
    path("car/<slug>", views.CarDetailView.as_view(), name="details"),
    path("search", views.SearchListView.as_view(), name="search"),
    path("cars", views.CategoryListView.as_view(), name="cars"),
    path("blogs", views.ArticleListView.as_view(), name="blog_list"),
    path("blog/<slug>", views.ArticleDetailView.as_view(), name="blog"),
    path("dealers", views.DealerListView.as_view(), name="dealers"),
    path("dealer/<slug>", views.DealerDetailView.as_view(), name="dealer"),
    path("submit-listing", views.submit_listing, name="submit_listing"),
    path("contact", views.contact, name="contact"),
    path('activate/<uidb64>/<token>/', views.ActivateAccount.as_view(), name='activate'),
    path("featured", views.featured, name="featured"),
    path("reservation-grid.html", views.reservation, name="reservation"),
    path("sell-car.html", views.sell_car, name="sell-car"),
    path("sell-car-1.html", views.sell_car_1, name="sell-car-1"),
    path("sell-car-2.html", views.sell_car_2, name="sell-car-2"),
    path("sell-car-3.html", views.sell_car_3, name="sell-car-3"),
    path("booking-system.html", views.booking, name="booking"),
    path("signup.html", views.signup, name="signup"),
    path("swap.html", views.swap, name="swap"),
    path("swap2.html", views.swap2, name="swap2"),
    path("swap3.html", views.swap2, name="swap3"),
    path("profile", views.profile, name="profile"),
    path("cars-for-sale.html", views.cars_for_sale, name="cars-for-sale"),
    path("bookmark", views.bookmark, name="bookmark"),
    path("change-password.html", views.password, name="password"),
    path("logout.html", views.logout, name="logout"),
    path("car-loan.html", views.car_loan, name="car-loan"),
    path("car-insurance.html", views.car_insurance, name="car-insurance"),
    path("clearing.html", views.clearing, name="clearing"),
    path("car-registration.html", views.car_registration, name="car-registration"),
    path("car-delivery.html", views.car_delivery, name="car-delivery"),
    path("user.html", views.user, name="user"),
    path("become-dealer.html", views.become_dealer, name="become-dealer.html"),







]
