from django.db import models

class Booking(models.Model):
    date = models.DateField()
    client = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=[
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ])

    def __str__(self):
        return f"Booking({self.client}, {self.date}, {self.status})"
