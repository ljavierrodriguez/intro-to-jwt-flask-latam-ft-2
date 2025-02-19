from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    profile = db.relationship("Profile", backref="user", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "profile": self.profile.serialize()
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password,  password)


class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    biography = db.Column(db.String, default="")
    github = db.Column(db.String, default="")
    facebook = db.Column(db.String, default="")
    instagram = db.Column(db.String, default="")
    twitter = db.Column(db.String, default="")
    avatar = db.Column(db.String, default="")
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            #"id": self.id,
            "biography": self.biography,
            "github": self.github,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "twitter": self.twitter,
            "avatar": self.avatar
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()