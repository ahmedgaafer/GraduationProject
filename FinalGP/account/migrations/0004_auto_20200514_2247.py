# Generated by Django 3.0.5 on 2020-05-14 20:47

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_auto_20200514_2244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='End_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 21, 20, 47, 41, 301584, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='token',
            name='Start_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 14, 20, 47, 41, 301584, tzinfo=utc)),
        ),
    ]
