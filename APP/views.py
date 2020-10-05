from django.shortcuts import render,redirect
from django.views.generic import ListView, DetailView, View
from . models import Car,Bookmark,UserProfile,Images,Article,Question,Report,Make
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib.auth.models import User, auth
import smtplib
from django.contrib.auth import  login
from email.mime.text import MIMEText
import datetime
from email.mime.multipart import MIMEMultipart
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_text
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from . tokens import account_activation_token
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
# Create your views here.
class ActivateAccount(View):

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = uidb64
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.profile.email_confirmed = True
            user.save()
            login(request, user)
            context={"message":'Your account has been confirmed.'}
            return render(request,'confirmation.html',context)
        else:
            context={"message":'The confirmation link was invalid, possibly because it has already been used.'}
            return render(request,'confirmation.html',context)

class IndexListView(ListView):
    model = Car
    template_name = "index.html"

    def post(self,request,*args, **kwargs):
        email = self.request.POST.get('email')
        password = self.request.POST.get('password')
        username = self.request.POST.get('username')
        name=self.request.POST.get('name')
        phone = self.request.POST.get('phone')
        password1 = self.request.POST.get('password1')
        password2 = self.request.POST.get('password2')
        return super(IndexListView, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexListView, self).get_context_data(**kwargs)
        boost=Car.objects.filter(feature_expire=datetime.datetime.now().date())
        premium=UserProfile.objects.filter(premium_expire=datetime.datetime.now().date())
        for i in boost:
            i.featured=False
            i.feature_expire=""
            i.save()
        for i in premium:
            i.premium=False
            i.premium_expire=""
            i.premium_feature_count=0
            i.save()
        search = Car.objects.none()
        if self.request.GET.get('sub')=="true":
            email=self.request.GET.get('email')
            name=self.request.GET.get('name')
            phone=self.request.GET.get('phone')
            check_email=Newsletter.objects.filter(email=email)
            if check_email.exists():
                context['message']=' This Email is Subscribed Already'
            else:
                news=Newsletter.objects.create(email=email,phone=phone,name=name)
                news.save()
                context['message']='Subscribed Successfully'
                fromaddr = "housing-send@advancescholar.com"
                toaddr = email
                subject="Newsletter Subscription"
                msg = MIMEMultipart()
                msg['From'] = fromaddr
                msg['To'] = toaddr
                msg['Subject'] = subject


                body = "You have successfully subscribed to our Newsletter..Look Up our website @ www.afriCar.com.ng and look through our properties"
                msg.attach(MIMEText(body, 'plain'))

                server = smtplib.SMTP('mail.advancescholar.com',  26)
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login("housing-send@advancescholar.com", "housing@24hubs.com")
                text = msg.as_string()
                server.sendmail(fromaddr, toaddr, text)
        elif self.request.method == 'POST':
            if self.request.POST.get("login")=="true":
                email = self.request.POST['email']
                if User.objects.filter(email=email):
                    username=User.objects.get(email=email).username
                else:
                    username=''
                password = self.request.POST['password']
                user = auth.authenticate(username=username, password=password)
                if user is not None:
                    auth.login(self.request, user)
                    context['message_login']="logged in"
                else:
                    context['message_login']="invalid login credentials"
            elif self.request.POST.get("register")=="true":
                username = self.request.POST['username']
                name=self.request.POST['name']
                email = self.request.POST['email']
                phone = self.request.POST['phone']
                password1 = self.request.POST['password1']
                password2 = self.request.POST['password2']
                user_type = self.request.POST['user_type']
                if password1 == password2:
                    if User.objects.filter(email=email).exists() or User.objects.filter(username=username).exists():

                        context["message_register"] ="user with email already exists"
                    else:
                        user = User.objects.create(
                        username=username, password=password1, email=email)
                        user.set_password(user.password)
                        user.save()
                        slug=name.replace(" ","")
                        profile = UserProfile.objects.create(user=user,name=name,website=email,phone=phone,user_type=user_type,slug=slug)
                        profile.save()
                        user.is_active = False
                        self.request.session['user'] = str(user.username)
                        current_site = get_current_site(self.request)
                        subject = 'Activate Your AutoBuy Account'
                        message = render_to_string('account_activation_email.html', {
                        'user': user,
                        'domain': current_site.domain,
                        'uid': user.pk,
                        'token': account_activation_token.make_token(user),
                        })
                        fromaddr = "housing-send@advancescholar.com"
                        toaddr = email
                        msg = MIMEMultipart()
                        msg['From'] = fromaddr
                        msg['To'] = toaddr
                        msg['Subject'] = subject


                        body = message
                        msg.attach(MIMEText(body, 'plain'))

                        server = smtplib.SMTP('mail.advancescholar.com',  26)
                        server.ehlo()
                        server.starttls()
                        server.ehlo()
                        server.login("housing-send@advancescholar.com", "housing@24hubs.com")
                        text = msg.as_string()
                        server.sendmail(fromaddr, toaddr, text)
                        context["message_confirm"]="Please Confirm your email to complete registration."
                        context["message_register"] ="user created"
        elif self.request.GET.get('third_check')=="three":
            if self.request.user.is_authenticated:
                title=self.request.GET.get('title')
                power=self.request.GET.get('power')
                speed=self.request.GET.get('speed')
                category=self.request.GET.get('category')
                model=self.request.GET.get('model')
                price=self.request.GET.get('price')
                model_year=self.request.GET.get('model_year')
                image=self.request.GET.get('image')
                image_url=image.replace('/media/','')
                transmission=self.request.GET.get('transmission')
                fuel_type=self.request.GET.get('fuel_type')
                condition=self.request.GET.get('condition')
                use_state=self.request.GET.get('use_state')
                book_check=Bookmark.objects.filter(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                if book_check:
                    pass
                else:
                    book=Bookmark.objects.create(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                    transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                    book.save()

        elif self.request.GET.get("report")=="true":
            arrange=self.request.GET.get("arrange")
            if arrange=="1":
                search=Car.objects.all().order_by("-id")
                context["search"]=search
            elif arrange=="2":
                search=Car.objects.all().order_by("id")
                context["search"]=search
            else:
                pass

        if search:
            paginator= Paginator(search,10)
            page_number = self.request.GET.get('page')
            page_obj = paginator.get_page(page_number)
            context['page_obj'] = page_obj
        else:
            paginator= Paginator(Car.objects.all(),10)
            page_number = self.request.GET.get('page')
            page_obj = paginator.get_page(page_number)
            context['page_obj'] = page_obj
        context['cars'] = Car.objects.all()
        context['featured'] = Car.objects.filter(featured=True)[:3]
        context['articles'] = Article.objects.all().order_by('-id')[:3]
        context['blogs'] = Article.objects.all().order_by('-id')[4:6]
        context['makes'] = Make.objects.all()
        context['dealers'] = UserProfile.objects.filter(user_type__icontains="dealer").order_by('-id')[:3]

        return context


class CarDetailView(DetailView):
    model = Car
    template_name = "listing.html"

    def get_object(self, queryset=None):
        global obj
        obj = super(CarDetailView, self).get_object(queryset=queryset)
        return obj
    def get_context_data(self, **kwargs):
        context = super(CarDetailView, self).get_context_data(**kwargs)
        if self.request.GET.get("inspect")=="true":
            name=self.request.GET.get("name")
            phone=self.request.GET.get("phone")
            email=self.request.GET.get("email")
            address=self.request.GET.get("address")
            message=self.request.GET.get("message")
            message="Inspection Request From A Buyer Regarding A Car You Have Assigned To You On autobuy.com "+message+" ."
            fromaddr = "housing-send@advancescholar.com"
            toaddr = UserProfile.objects.get(user=obj.user).website
            msg = MIMEMultipart()
            msg['From'] = fromaddr
            msg['To'] = toaddr
            msg['Subject'] ="Inspection Of Car"


            body = message+ "My contacts are"  + " phone " + phone
            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP('mail.advancescholar.com',  26)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login("housing-send@advancescholar.com", "housing@24hubs.com")
            text = msg.as_string()
            server.sendmail(fromaddr, toaddr, text)
            context['message']="Question Sent Successfully"
        elif self.request.GET.get('third_check')=="three":
            if self.request.user.is_authenticated:
                item=self.request.GET.get('item')
                favorite=Car.objects.get(slug=item)
                title=favorite.title
                power=favorite.power
                speed=favorite.speed
                category=favorite.category
                model=favorite.model
                price=favorite.price
                model_year=favorite.model_year
                image=favorite.image
                image_url=image.replace('/media/','')
                transmission=favorite.transmission
                fuel_type=favorite.fuel_type
                condition=favorite.condition
                use_state=favorite.use_state
                book_check=Bookmark.objects.filter(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                if book_check:
                    pass
                else:
                    book=Bookmark.objects.create(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                    transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                    book.save()
        elif self.request.GET.get('report')=="true":
            item=Car.objects.get(title=obj.title)
            title=item.title
            reason=self.request.GET.get('reason')
            report=Report.objects.create(title=title,reason=reason)
            report.save()
        context['cars'] = Car.objects.all()
        context['other'] = Car.objects.filter(category=obj.category).order_by("-id")
        paginator= Paginator(Car.objects.filter(category=obj.category).order_by("-id"),10)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context['latest'] = Car.objects.all().order_by('-id')[:3]
        if UserProfile.objects.filter(user=obj.user):
            context['dealer']=UserProfile.objects.get(user=obj.user)
        context['featured'] = Car.objects.filter(featured=True)[:3]
        return context



class SearchListView(ListView):
    model = Car
    template_name = "inventory-grid.html"
    def get_context_data(self, **kwargs):
        context = super(SearchListView, self).get_context_data(**kwargs)
        search=''
        if self.request.GET.get('first_check')=="one":
            first_check="one"
            query = self.request.GET.get('keyword')
            use_state= self.request.GET.get('use_state')
            arrange=self.request.GET.get('arrange')
            category= self.request.GET.get('category')
            if category:
                category= self.request.GET.get('category')
            else:
                category=""
            model= self.request.GET.get('model')
            if model:
                model= self.request.GET.get('model')
            else:
                model=''
            make= self.request.GET.get('make')
            if model:
                make= self.request.GET.get('make')
            else:
                make=''
            year_min=self.request.GET.get('year_min')
            if year_min:
                new_year_min=int(year_min)
            else:
                new_year_min=1950
            year_max=self.request.GET.get('year_max')
            if year_max:
                new_year_max=int(year_max)
            else:
                new_year_max=2020
            price_min=self.request.GET.get('price_min')
            if price_min:
                new_price_min=int(price_min)
            else:
                new_price_min=1000
            price_max=self.request.GET.get('price_max')
            if price_max:
                new_price_max=int(price_max)
            else:
                new_price_max=1000000
            fuel_type=self.request.GET.get('fuel_type')
            if fuel_type:
                fuel_type= self.request.GET.get('fuel_type')
            else:
                fuel_type=''
            condition=self.request.GET.get('condition')
            if condition:
                condition= self.request.GET.get('condition')
            else:
                condition=''
            transmission=self.request.GET.get('transmission')
            if transmission:
                transmission=self.request.GET.get('transmission')
            else:
                transmission=""
            if first_check=="one":
                search = self.model.objects.filter(Q(title__icontains=query),Q(use_state__icontains=use_state),Q(category__icontains=category),Q(fuel_type__icontains=fuel_type),Q(condition__icontains=condition),Q(model__icontains=model), Q(transmission__icontains=transmission),Q(make__icontains=make),Q(model_year__range=(new_year_min, new_year_max)),Q(price__range=(new_price_min, new_price_max)))
                context['search'] = search
            else:
                search = self.model.objects.none()
                context['search'] = search
        elif self.request.GET.get('second_check')=="two":
            second_check="two"
            query = self.request.GET.get('keyword')
            if second_check=="two":
                search = self.model.objects.filter(Q(title__icontains=query))
                context['search']=search
            else:
                search = self.model.objects.none()
                context['search'] = search
        elif self.request.GET.get('third_check')=="three":
            if self.request.user.is_authenticated:
                title=self.request.GET.get('title')
                power=self.request.GET.get('power')
                speed=self.request.GET.get('speed')
                category=self.request.GET.get('category')
                model=self.request.GET.get('model')
                price=self.request.GET.get('price')
                model_year=self.request.GET.get('model_year')
                image=self.request.GET.get('image')
                image_url=image.replace('/media/','')
                transmission=self.request.GET.get('transmission')
                fuel_type=self.request.GET.get('fuel_type')
                condition=self.request.GET.get('condition')
                use_state=self.request.GET.get('use_state')
                book_check=Bookmark.objects.filter(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                if book_check:
                    pass
                else:
                    book=Bookmark.objects.create(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                    transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                    book.save()
        if search:
            paginator= Paginator(search,10)
            page_number = self.request.GET.get('page')
            page_obj = paginator.get_page(page_number)
            context['page_obj'] = page_obj
        context['featured'] = Car.objects.filter(featured=True)[:3]
        return context

class CategoryListView(ListView):
    model = Car
    template_name = "cars.html"
    def get_context_data(self, **kwargs):
        context = super(CategoryListView, self).get_context_data(**kwargs)
        search=''
        if self.request.GET.get('search')=="true":
            first_check="one"
            category=self.request.GET.get("category")
            if first_check=="one":
                search = self.model.objects.filter(category=category)
                context["category"]=category
                context['search'] = search

            else:
                search = self.model.objects.none()
                context['search'] = search
        elif self.request.GET.get('third_check')=="three":
            if self.request.user.is_authenticated:
                title=self.request.GET.get('title')
                power=self.request.GET.get('power')
                speed=self.request.GET.get('speed')
                category=self.request.GET.get('category')
                model=self.request.GET.get('model')
                price=self.request.GET.get('price')
                model_year=self.request.GET.get('model_year')
                image=self.request.GET.get('image')
                image_url=image.replace('/media/','')
                transmission=self.request.GET.get('transmission')
                fuel_type=self.request.GET.get('fuel_type')
                condition=self.request.GET.get('condition')
                use_state=self.request.GET.get('use_state')
                book_check=Bookmark.objects.filter(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                if book_check:
                    pass
                else:
                    book=Bookmark.objects.create(title=title,power=power,speed=speed,category=category,price=price,model_year=model_year,image=image_url,
                    transmission=transmission,fuel_type=fuel_type,condition=condition,use_state=use_state,creator=self.request.user)
                    book.save()
                    context['search']
        if search:
            paginator= Paginator(search,10)
            page_number = self.request.GET.get('page')
            page_obj = paginator.get_page(page_number)
            context['page_obj'] = page_obj
        context['featured'] = Car.objects.filter(featured=True)[:3]
        return context
@login_required
def submit_listing(request):
    context={"car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
    if request.POST.get("create")=="true":
        title=request.POST.get("title")
        model=request.POST.get("model")
        power=request.POST.get("power")
        make=request.POST.get("make")
        category=request.POST.get("category")
        model_year=request.POST.get("model_year")
        transmission=request.POST.get("transmission")
        fuel_type=request.POST.get("fuel_type")
        condition=request.POST.get("condition")
        use_state=request.POST.get("use_state")
        price=request.POST.get("price")
        ratings=request.POST.get("ratings")
        phone=request.POST.get("phone")
        speed=request.POST.get("speed")
        email=request.POST.get("email")
        features=request.POST.get("features")
        image=request.FILES.getlist("image")
        slug=title+model+power
        car_check=Car.objects.filter(title=title,power=power,make=make,model=model,transmission=transmission,
        fuel_type=fuel_type,condition=condition,use_state=use_state,price=price,rating=ratings,phone=phone,email=email)
        if car_check:
            context={"message":"car alrady exists","car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
        else:
            context={"message":"car created","car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
            car=Car.objects.create(title=title,power=power,speed=speed,make=make,model=model,transmission=transmission,
            fuel_type=fuel_type,condition=condition,use_state=use_state,price=price,rating=ratings,phone=phone,email=email,user=request.user,features=features,slug=slug)
            car.save()
            for x in image:
                new_image=Images.objects.create(title=title,image=x)
                new_image.save()
                car.image.add(new_image)
                car.save()
            return render(request,"mylistings.html",context)
    elif request.POST.get("edit")=="true":
        item=request.POST.get("item")
        item_2=request.POST.get("item_2")
        title=request.POST.get("title")
        model=request.POST.get("model")
        power=request.POST.get("power")
        make=request.POST.get("make")
        model_year=request.POST.get("model_year")
        transmission=request.POST.get("transmission")
        fuel_type=request.POST.get("fuel_type")
        condition=request.POST.get("condition")
        use_state=request.POST.get("use_state")
        price=request.POST.get("price")
        ratings=request.POST.get("ratings")
        phone=request.POST.get("phone")
        speed=request.POST.get("speed")
        email=request.POST.get("email")
        image=request.FILES.getlist("image")
        car_check=Car.objects.get(title=item,slug=item_2)
        if title:
            car_check.title=title
        if model:
            car_check.model=model
        if power:
            car_check.power=power
        if make:
            car_check.ake=make
        if model_year:
            car_check.model_year=model_year
        if transmission:
            car_check.transmission=transmission
        if fuel_type:
            car_check.fuel_type=fuel_type
        if condition:
            car_check.condition=condition
        if use_state:
            car_check.use_state=use_state
        if price:
            car_check.price=price
        if ratings:
            car_check.rating=ratings
        if phone:
            car_check.phone=phone
        if speed:
            car_check.speed=speed
        if email:
            car_check.email=email
        car_check.save()
        if image:
            for x in image:
                new_image=Images.objects.create(title=title,image=x)
                new_image.save()
                car_check.image=car_check.image.add(new_image)
                car_check.save()
        context={"car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
    elif request.GET.get("boost")=="true":
        date1 = datetime.timedelta(days=7)
        date2 = datetime.timedelta(days=14)
        date=datetime.datetime.now().date()
        item=request.GET.get("item")
        boost=Car.objects.get(slug=item)
        boost.featured= True
        boost.feature_expire=date+date1
        boost.save()
    elif request.GET.get("boost")=="false":
        date1 = datetime.timedelta(days=7)
        date2 = datetime.timedelta(days=14)
        date=datetime.datetime.now().date()
        item=request.GET.get("item")
        boost=Car.objects.get(slug=item)
        boost.featured= True
        boost.feature_expire=date+date2
        boost.save()
        context={"car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
    elif request.GET.get("premium")=="true":
        date=datetime.datetime.now().date()
        date2 = datetime.timedelta(days=30)
        premium=UserProfile.objects.get(user=request.user)
        premium.premium=True
        premium.premium_feature_count=2
        premium.premium_expire=date+date2
        premium.save()
        context={"car":Car.objects.filter(user=request.user),'featured':Car.objects.filter(featured=True)[:3]}
    return render(request,"mylistings.html",context)

class ArticleListView(ListView):
    model = Article
    template_name = "page_blog.html"
    def get_context_data(self, **kwargs):
        context = super(ArticleListView, self).get_context_data(**kwargs)
        check_login=self.request.user
        context['blogs'] = Article.objects.all()
        blog=Article.objects.all()
        paginator= Paginator(Article.objects.all(),10)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context["featured"]=Car.objects.filter(featured=True)[:3]
        context["dealers"]=UserProfile.objects.filter(user_type__icontains="dealer")[:3]
        return context

class ArticleDetailView(DetailView):
    model = Article
    template_name = "page_image-gallery.html"

    def get_object(self, queryset=None):
        global obj
        obj = super(ArticleDetailView, self).get_object(queryset=queryset)
        return obj
    def get_context_data(self, **kwargs):
        context = super(ArticleDetailView, self).get_context_data(**kwargs)
        if self.request.GET.get('comment_check')=="True":
            name=self.request.GET.get("name")
            email=self.request.GET.get("email")
            comment=self.request.GET.get("comment")
            new_comment=Comment.objects.create(name=name,email=email,comment=comment,blog=obj.title)
            new_comment.save()
        check_login=self.request.user

        context['latest'] = Car.objects.all().order_by('-id')[:3]
        context['blogs'] = Article.objects.all()
        popular=[]
        blog=Article.objects.all()
        check=1
        context["featured"]=Car.objects.filter(featured=True)[:3]
        return context


class DealerDetailView(DetailView):
    model = UserProfile
    template_name = "page_profile.html"


    def post(self,request,*args, **kwargs):
        email = self.request.POST.get('email')
        name=self.request.POST.get('name')
        phone = self.request.POST.get('phone')
        question = self.request.POST.get('question')
        return super(DealerDetailView, self).get(request, *args, **kwargs)
    def get_object(self, queryset=None):
        global obj
        obj = super(DealerDetailView, self).get_object(queryset=queryset)
        return obj
    def get_context_data(self, **kwargs):
        context = super(DealerDetailView, self).get_context_data(**kwargs)
        if self.request.method == 'POST':
            email = self.request.POST.get('email')
            name=self.request.POST.get('name')
            phone = self.request.POST.get('phone')
            question = self.request.POST.get('question')
            tour=Question.objects.create(phone=phone,name=name,question=question)
            tour.save()
            message="Questions From A Buyer Regarding A Car You Have Assigned To You On autobuy.com "+question+" ."
            fromaddr = "housing-send@advancescholar.com"
            toaddr = "chukslord1@gmail.com"
            msg = MIMEMultipart()
            msg['From'] = fromaddr
            msg['To'] = toaddr
            msg['Subject'] ="Enquiry For Car"


            body = message+ "My contacts are"  + " phone " + phone
            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP('mail.advancescholar.com',  26)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login("housing-send@advancescholar.com", "housing@24hubs.com")
            text = msg.as_string()
            server.sendmail(fromaddr, toaddr, text)
            context['message']="Question Sent Successfully"

        context['latest'] = Car.objects.all().order_by('-id')[:3]
        context['assigned'] = Car.objects.filter(user=obj.user)
        context['blogs'] = Article.objects.all()
        popular=[]
        blog=Article.objects.all()
        check=1
        paginator= Paginator(Car.objects.filter(user=obj.user),10)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context["featured"]=Car.objects.filter(featured=True)[:3]
        return context

class DealerListView(ListView):
    model = UserProfile
    template_name = "dealers.html"

    def get_context_data(self, **kwargs):
        context = super(DealerListView, self).get_context_data(**kwargs)
        context['search']=UserProfile.objects.filter(user_type__icontains="dealer")
        paginator= Paginator(UserProfile.objects.filter(user_type__icontains="dealer"),10)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context["featured"]=Car.objects.filter(featured=True)[:3]
        return context


def contact(request):
    context={'featured':Car.objects.filter(featured=True)[:3]}
    if request.method=="POST":
        name=request.POST['name']
        email=request.POST['email']
        phone=request.POST['phone']
        message=request.POST['message']
        fromaddr = "housing-send@advancescholar.com"
        toaddr = "chukslord1@gmail.com"
        subject=request.POST['subject']
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = name + "-" + subject


        body = message +"-"+"email" + email
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('mail.advancescholar.com',  26)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login("housing-send@advancescholar.com", "housing@24hubs.com")
        text = msg.as_string()
        server.sendmail(fromaddr, toaddr, text)
        context={'message':'Your message has been sent sucessfully','featured':Car.objects.filter(featured=True)[:3]}
        return render(request, 'page_contact.html',context)
    return render(request,"page_contact.html",context)


def featured(request):
    context={"search":Car.objects.filter(featured=True),'featured':Car.objects.filter(featured=True)[:3]}
    return render(request,"features.html",context)

def password(request):
    context={"compare":Comparison.objects.filter(creator=request.user),"profile":UserProfile.objects.get(user=request.user)}
    if request.method=="POST":
        current=request.POST.get("current")
        password=request.POST.get("password")
        confirm=request.POST.get('confirm')
        print(current)
        if auth.authenticate(username=request.user, password=current):
            if password==confirm:
                data=User.objects.get(username=request.user)
                print(data)
                data.set_password(password)
                data.save()
                return redirect("index.html")
    elif request.method=="GET":
        if request.GET.get('clear')=="True":
            clear=Comparison.objects.filter(creator=request.user)
            clear.delete()
    return render(request,"change-password.html",context)
@login_required
def profile(request):
    context={'featured':Car.objects.filter(featured=True)[:3],"bookmarks":Bookmark.objects.filter(creator=request.user)}
    if request.method=="POST":
        name=request.POST.get("name")
        email=request.POST.get("email")
        phone=request.POST.get("phone")
        description=request.POST.get("description")
        image=request.FILES.get("image")
        data=UserProfile.objects.get(user=request.user)
        if name:
            data.name=name
        if phone:
            data.phone=phone
        if email:
            data.website=email
        if description:
            data.description=description
        if image:
            data.image=image
        data.save()
    return render(request,"profile.html",context)
@login_required
def bookmark(request):
    context={'featured':Car.objects.filter(featured=True)[:3],"bookmarks":Bookmark.objects.filter(creator=request.user)}
    return render(request,"bookmarks.html",context)
@login_required
def logout(request):
    auth.logout(request)
    return redirect("index.html")
