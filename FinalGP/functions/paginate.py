import math
def paginate(data, page, per_page):
    page = int(page) or 1
    per_page = int(per_page) or 10
    offset = (page - 1) * per_page
    total_pages = math.ceil(len(data) / per_page)
    print(data)
    paginatedItems = data[offset : offset + per_page]
    return {
        "page": page,
        "per_page": per_page,
        "pre_page": page - 1 if page - 1 else None,
        "next_page": page + 1 if (total_pages > page) else  None,
        "total": len(data),
        "total_pages": total_pages,
        "data": paginatedItems
    }