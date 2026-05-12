from django.db import models
from django.contrib.auth.models import User



class Asset(models.Model):
    CATEGORY_CHOICES = [
        ('Laptop', 'Laptop'),
        ('Mobile', 'Mobile'),
        ('Monitor', 'Monitor'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    serial_number = models.CharField(max_length=100, unique=True)
    purchase_date = models.DateField()
    status = models.CharField(max_length=50, default='Available')

    def __str__(self):
        return f"{self.name} ({self.serial_number})"



class Inventory(models.Model):
    asset = models.OneToOneField(Asset, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.asset.name} - {self.location}"



class Assignment(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    assigned_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Assigned')

    def __str__(self):
        return f"{self.asset.name} → {self.assigned_to.username}"



class Ticket(models.Model):
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Closed', 'Closed'),
    ]

    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket #{self.id} - {self.status}"