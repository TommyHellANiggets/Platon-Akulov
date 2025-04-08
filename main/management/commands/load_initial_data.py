from django.core.management.base import BaseCommand
from main.models import Statistics, Testimonial
from datetime import datetime

class Command(BaseCommand):
    help = 'Загрузка начальных данных'

    def handle(self, *args, **kwargs):
        # Создаем статистику
        Statistics.objects.get_or_create(
            years_experience=4,
            projects_count=50,
            clients_count=30,
            positive_reviews=35
        )

        # Список отзывов
        testimonials = [
            {
                'project_title': 'Поднятие и настройка Django-проектов',
                'author_name': 'shaidullin2h',
                'comment': 'Обращаюсь второй раз к исполнителю, все в порядке, написал инструкцию, все подробно объясняет. Рекомендую.',
                'is_positive': True,
                'date': '2024-03-12'
            },
            {
                'project_title': 'Поднятие и настройка Django-проектов на хостинге',
                'author_name': 'shaidullin2h',
                'comment': 'Была задача развернуть проект django на сервере, помог с SSL и с доменом. Подскажет, объяснит как улучшить. Благодарю за работу, рекомендую!',
                'is_positive': True,
                'date': '2024-02-20'
            },
            {
                'project_title': 'Доработка верстки',
                'author_name': 'webformat',
                'comment': 'Отличная работа! Все получилось как я хотел.',
                'is_positive': True,
                'date': '2024-01-16'
            },
            {
                'project_title': 'Верстка дашборда',
                'author_name': 'tanyushincompany',
                'comment': 'Заказ выполнен на высшем уровне, Все очень четко и грамотно сделано, рекомендую, и сам будут точно еще раз обращаться',
                'is_positive': True,
                'date': '2024-01-16'
            },
            {
                'project_title': 'Квиз с админкой',
                'author_name': 'Golandec228',
                'comment': 'Отличный продавец советую всем, он лучший в своём деле! !!',
                'is_positive': True,
                'date': '2023-11-16'
            },
            {
                'project_title': 'Адаптивная верстка онлайн игры',
                'author_name': 'maxteeden',
                'comment': 'Георгий – Мощный исполнитель. Самостоятельный. Быстрый. К правкам всем отнесся с пониманием. Буду обращаться еще!',
                'is_positive': True,
                'date': '2023-10-16'
            },
            {
                'project_title': 'Верстка каталога',
                'author_name': 'gaisdf',
                'comment': 'Уже повторно обращаюсь к Григорию. Всем рекомендую данного специалиста, отношение к работе на высшем уровне, качество, пунктуальность, добросовестность!',
                'is_positive': True,
                'date': '2023-10-16'
            },
            {
                'project_title': 'Копия сайта',
                'author_name': 'Katy79',
                'comment': 'Хотела бы выразить свою благодарность Георгию за отличную работу! Сайт получился отличным. Несмотря на то, что мой изначальный сайт был достаточно нетипичным и его исходная платформа закрылась, исполнитель предложил несколько вариантов решения проблемы и оперативно разработал сайт на Django. Работа была выполнена тщательно и с высоким качеством. Все функции работают без сбоев, и я очень довольна результатом. Рекомендую этого специалиста всем, кто ищет надежного и компетентного разработчика!',
                'is_positive': True,
                'date': '2023-09-16'
            },
            {
                'project_title': 'Поэтапное создание сайта',
                'author_name': 'gaisdf',
                'comment': 'Большое спасибо Георгию, за качественную и быструю работу! Исполнение заказа устраивает на 100%. Всегда на связи, подскажет, разъяснит, поможет решить попутно возникающие вопросы. Рекомендую сотрудничать с данным исполнителем.',
                'is_positive': True,
                'date': '2023-09-16'
            },
            {
                'project_title': 'Верстка страницы',
                'author_name': 'Denis_Franz',
                'comment': 'Все супер и очень быстро. Спасибо!',
                'is_positive': True,
                'date': '2023-09-16'
            },
            {
                'project_title': 'Адаптивная верстка + поднятие на хост',
                'author_name': 'Xenikaaa',
                'comment': 'Спасибо за отличную работу) Нужно было сверстать небольшой лендинг с подключением базы данных для проверки кодов. Все было сделано оперативно и на высшем уровне. Особенно порадовала внимательность к деталям и четкое соблюдение пожеланий и сроков. Результат превзошел все ожидания! Рекомендую!',
                'is_positive': True,
                'date': '2023-08-16'
            }
        ]

        # Создаем отзывы
        for testimonial_data in testimonials:
            Testimonial.objects.get_or_create(
                project_title=testimonial_data['project_title'],
                author_name=testimonial_data['author_name'],
                comment=testimonial_data['comment'],
                is_positive=testimonial_data['is_positive'],
                date=datetime.strptime(testimonial_data['date'], '%Y-%m-%d').date()
            )

        self.stdout.write(self.style.SUCCESS('Данные успешно загружены')) 