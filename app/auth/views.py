from flask import render_template,request,redirect,url_for,abort
from flask_login import login_user,login_required,current_user
from ..models import User
from .forms import LoginForm
from . import auth

# Views
@auth.route('/login', methods=["GET","POST"])
def login():
    title = 'Login'
    Form = LoginForm()
    Error=False
    if Form.validate_on_submit():
        username=str(Form.username.data)
        password=str(Form.username.data)
        if username and password:
            user=User.query.filter(User.username==username).first()
            if user and user.verifypass(password):
                login_user(user,Form.remember.data)
                return redirect(request.args['next'])
        Error=True
    return render_template('login.html', title = title ,Form=Form,Error=Error)
