from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (superheroes)
        users_data = [
            {'username': 'ironman', 'email': 'tony@stark.com', 'password': 'ironman123'},
            {'username': 'captainamerica', 'email': 'steve@rogers.com', 'password': 'shield123'},
            {'username': 'thor', 'email': 'thor@asgard.com', 'password': 'mjolnir123'},
            {'username': 'blackwidow', 'email': 'natasha@shield.com', 'password': 'widow123'},
            {'username': 'batman', 'email': 'bruce@wayne.com', 'password': 'batman123'},
            {'username': 'superman', 'email': 'clark@kent.com', 'password': 'superman123'},
        ]

        users = []
        for data in users_data:
            user = User(**data)
            user.save()
            users.append(user)
            self.stdout.write(f"Created user: {user.username}")

        # Create teams
        team_marvel = Team(name='Team Marvel')
        team_marvel.save()
        team_marvel.members.set(users[:4])

        team_dc = Team(name='Team DC')
        team_dc.save()
        team_dc.members.set(users[4:])

        self.stdout.write("Created teams: Team Marvel and Team DC")

        # Create activities
        activities_data = [
            {
                'name': 'Running Club',
                'description': 'Join us for morning runs around the track.',
                'schedule': 'Mondays and Wednesdays at 6am',
                'max_attendance': 20,
            },
            {
                'name': 'Yoga Class',
                'description': 'Relax and stretch with our weekly yoga sessions.',
                'schedule': 'Fridays at 5pm',
                'max_attendance': 15,
            },
            {
                'name': 'Swimming',
                'description': 'Improve your swimming technique with our coached sessions.',
                'schedule': 'Tuesdays and Thursdays at 7am',
                'max_attendance': 10,
            },
            {
                'name': 'Manga Maniacs',
                'description': 'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
                'schedule': 'Tuesdays at 7pm',
                'max_attendance': 15,
            },
        ]

        for data in activities_data:
            activity = Activity(**data)
            activity.save()
            self.stdout.write(f"Created activity: {activity.name}")

        # Create leaderboard entries
        leaderboard_data = [
            {'user': users[0], 'points': 150},
            {'user': users[1], 'points': 200},
            {'user': users[2], 'points': 175},
            {'user': users[3], 'points': 125},
            {'user': users[4], 'points': 190},
            {'user': users[5], 'points': 160},
        ]

        for data in leaderboard_data:
            entry = Leaderboard(**data)
            entry.save()
            self.stdout.write(f"Created leaderboard entry for: {data['user'].username}")

        # Create workouts
        workouts_data = [
            {
                'name': 'Morning Run',
                'description': 'A 5km morning run to start your day.',
                'duration': 30,
            },
            {
                'name': 'Strength Training',
                'description': 'Full body strength training session.',
                'duration': 45,
            },
            {
                'name': 'HIIT Workout',
                'description': 'High-intensity interval training for maximum calorie burn.',
                'duration': 20,
            },
            {
                'name': 'Yoga Flow',
                'description': 'Relaxing yoga flow to improve flexibility.',
                'duration': 60,
            },
        ]

        for data in workouts_data:
            workout = Workout(**data)
            workout.save()
            self.stdout.write(f"Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db database with test data'))
