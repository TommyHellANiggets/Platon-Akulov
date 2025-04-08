from django import template

register = template.Library()

@register.filter
def index(lst, i):
    """Возвращает элемент списка по индексу"""
    try:
        return lst[i]
    except (IndexError, TypeError):
        return ''

@register.filter
def multiply(value, arg):
    """Умножает значение на аргумент"""
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return 0

@register.filter
def divide(value, arg):
    """Делит значение на аргумент"""
    try:
        arg = float(arg)
        if arg == 0:
            return 0
        return float(value) / arg
    except (ValueError, TypeError):
        return 0

@register.filter
def page_range(total_pages, current_page=1):
    """Генерирует диапазон страниц для пагинации"""
    current_page = int(current_page)
    total_pages = int(total_pages)
    
    if total_pages <= 7:
        # Если страниц мало, показываем все
        return range(1, total_pages + 1)
    
    # Для многостраничных результатов показываем страницы рядом с текущей
    if current_page <= 4:
        # Начало списка
        return list(range(1, 8)) + ['...', total_pages]
    elif current_page >= total_pages - 3:
        # Конец списка
        return [1, '...'] + list(range(total_pages - 6, total_pages + 1))
    else:
        # Середина списка
        return [1, '...'] + list(range(current_page - 2, current_page + 3)) + ['...', total_pages] 