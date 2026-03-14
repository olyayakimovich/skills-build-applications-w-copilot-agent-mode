from djongo import models


class User(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.username


class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    members = models.ArrayReferenceField(to=User, on_delete=models.CASCADE)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    schedule = models.CharField(max_length=100)
    max_attendance = models.IntegerField(default=0)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name


class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    user = models.EmbeddedField(model_container=User)
    points = models.IntegerField(default=0)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return f"{self.user} - {self.points} points"


class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField(default=0)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name
