from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from main.models import Testimonial


class Command(BaseCommand):
    help = 'Добавляет отзывы с Kwork, удаляя старые'

    def handle(self, *args, **options):
        # Удаляем все старые отзывы
        deleted_count = Testimonial.objects.all().delete()[0]
        self.stdout.write(self.style.SUCCESS(f'Удалено {deleted_count} старых отзывов'))

        # Данные отзывов с Kwork
        reviews = [
            {
                'author': 'C999',
                'project': 'Создание сайт',
                'comment': 'Always a pleasure to work with. Always on time. Patient and does the job.',
                'days_ago': 14,
                'rating': 5
            },
            {
                'author': '923Sen',
                'project': 'Создание сайта',
                'comment': 'Все отлично. Спасибо',
                'days_ago': 27,
                'rating': 5
            },
            {
                'author': 'C999',
                'project': 'Индивидуальный заказ tommyloveallniggets #2',
                'comment': 'Always a positive experience. Was working with him for more than 6 months now and still going on',
                'days_ago': 30,
                'rating': 5
            },
            {
                'author': 'catchyourfreedom',
                'project': 'Сайт по продаже подарочных карт Roblox',
                'comment': 'Заказывал сайт по продаже подарочных карт Roblox с админкой https://justoneclick.ru/. Исполнитель сделал всё по ТЗ и в срок. Рекомендую.',
                'days_ago': 60,
                'rating': 5
            },
            {
                'author': 'elena_arseneva',
                'project': 'Верстка',
                'comment': 'Работа была сделана очень быстро, раньше срока. Очень довольны сотрудничеством, большое спасибо!',
                'days_ago': 90,
                'rating': 5
            },
            {
                'author': 'Egor2241',
                'project': 'Доработка функционала сайта',
                'comment': 'Исполнитель добросовестный, хорошо выполняет работу, подсказывает как сделать лучше, все устраивает',
                'days_ago': 90,
                'rating': 5
            },
            {
                'author': 'C999',
                'project': 'Ongoing project',
                'comment': 'Ongoing project.',
                'days_ago': 150,
                'rating': 5
            },
            {
                'author': 'wexelar',
                'project': 'Доработка сайта, система авторизации',
                'comment': 'Было несколько задач по django, все было сделано очень быстро, и так, как хотелось. Рекомендую',
                'days_ago': 180,
                'rating': 5
            },
            {
                'author': 'nataly2527',
                'project': 'Поднятие Django на хостинге',
                'comment': 'Нужно было развернуть сайт с калькулятором для внутреннего пользования, отличная работа, все очень оперативно, благодарю',
                'days_ago': 210,
                'rating': 5
            },
            {
                'author': 'C999',
                'project': 'First week of the plan',
                'comment': 'It is a big project and after speaking with various people he is the only person who showed expertise. Have started the project and first part of the project this week. It was done very well. I am happy with the work. We will be proceeding to next stages now.',
                'days_ago': 210,
                'rating': 5
            },
            {
                'author': 'shaidullin2h',
                'project': 'Перенос изменений на хост',
                'comment': 'Обращаюсь второй раз к исполнителю, все в порядке, написал инструкцию, все подробно объясняет. Рекомендую.',
                'days_ago': 240,
                'rating': 5
            },
            {
                'author': 'shaidullin2h',
                'project': 'Поднятие Django на хостинге RegRu',
                'comment': 'Была задача развернуть проект django на сервере, помог с SSL и с доменом. Подскажет, объяснит как улучшить. Благодарю за работу, рекомендую!',
                'days_ago': 270,
                'rating': 5
            },
            {
                'author': 'webformat',
                'project': 'Доработка верстки',
                'comment': 'Отличная работа! Все получилось как я хотел.',
                'days_ago': 300,
                'rating': 5
            },
            {
                'author': 'tanyushincompany',
                'project': 'Верстка дашборда',
                'comment': 'Заказ выполнен на высшем уровне, Все очень четко и грамотно сделано, рекомендую, и сам будут точно еще раз обращаться',
                'days_ago': 330,
                'rating': 5
            },
            {
                'author': 'Golandec228',
                'project': 'Квиз с админкой',
                'comment': 'Отличный продавец советую всем, он лучший в своём деле!!!',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'maxteeden',
                'project': 'Адаптивная верстка онлайн игры',
                'comment': 'Георгий – Мощный исполнитель. Самостоятельный. Быстрый. К правкам всем отнесся с пониманием. Буду обращаться еще!',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'gaisdf',
                'project': 'Верстка каталога',
                'comment': 'Уже повторно обращаюсь к Григорию. Всем рекомендую данного специалиста, отношение к работе на высшем уровне, качество, пунктуальность, добросовестность!',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'Katy79',
                'project': 'Копия сайта на Django',
                'comment': 'Хотела бы выразить свою благодарность Георгию за отличную работу! Сайт получился отличным. Несмотря на то, что мой изначальный сайт был достаточно нетипичным и его исходная платформа закрылась, исполнитель предложил несколько вариантов решения проблемы и оперативно разработал сайт на Django. Работа была выполнена тщательно и с высоким качеством. Все функции работают без сбоев, и я очень довольна результатом. Рекомендую этого специалиста всем, кто ищет надежного и компетентного разработчика!',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'gaisdf',
                'project': 'Поэтапное создание сайта',
                'comment': 'Большое спасибо Георгию, за качественную и быструю работу! Исполнение заказа устраивает на 100%. Всегда на связи, подскажет, разъяснит, поможет решить попутно возникающие вопросы. Рекомендую сотрудничать с данным исполнителем.',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'Yoki_Toki',
                'project': 'Верстка страницы',
                'comment': 'Все супер и очень быстро. Спасибо!',
                'days_ago': 365,
                'rating': 5
            },
            {
                'author': 'Xenikaaa',
                'project': 'Адаптивная верстка + поднятие на хост',
                'comment': 'Спасибо за отличную работу) Нужно было сверстать небольшой лендинг с подключением базы данных для проверки кодов. Все было сделано оперативно и на высшем уровне. Особенно порадовала внимательность к деталям и четкое соблюдение пожеланий и сроков. Результат превзошел все ожидания! Рекомендую!',
                'days_ago': 365,
                'rating': 5
            },
        ]

        # Ссылка на профиль Kwork
        kwork_link = 'https://kwork.ru/user/tommyloveallniggets'

        # Добавляем отзывы
        added_count = 0
        for review in reviews:
            # Вычисляем дату отзыва
            review_date = timezone.now().date() - timedelta(days=review['days_ago'])
            
            # Создаем отзыв
            Testimonial.objects.create(
                project_title=review['project'],
                author_name=review['author'],
                comment=review['comment'],
                is_positive=True,  # Все отзывы положительные (5 звезд)
                date=review_date,
                link=kwork_link
            )
            added_count += 1

        self.stdout.write(self.style.SUCCESS(f'Добавлено {added_count} новых отзывов с Kwork'))
        self.stdout.write(self.style.SUCCESS('Готово! Все отзывы обновлены.'))
