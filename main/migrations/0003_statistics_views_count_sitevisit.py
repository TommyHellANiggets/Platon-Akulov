from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20250318_0041'),
    ]

    operations = [
        migrations.AddField(
            model_name='statistics',
            name='views_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Просмотров'),
        ),
        migrations.CreateModel(
            name='SiteVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_key', models.CharField(max_length=64, unique=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('user_agent', models.CharField(blank=True, max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Просмотр',
                'verbose_name_plural': 'Просмотры',
                'ordering': ['-created_at'],
            },
        ),
    ]
