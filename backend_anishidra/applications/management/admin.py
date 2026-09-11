from django.contrib import admin
from .models import Client, externalIncome, externalExpense


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = (
        'firstName',
        'lastName',
        'role',
        'email',
        'whatsapp',
        'type',
        'start',
        'end',
        'amount',
        'expenses',
        'status',
        'total',
    )
    list_filter = (
        'type',
        'start',
        'end',
        'status',
        'amount',
        'expenses',
        'total',
    )
    search_fields = (
        'firstName',
        'lastName',
        'role',
        'email',
        'whatsapp',
        'type',
    )
    ordering = (
        'id',
        'amount',
        'expenses',
        'total',
    )

@admin.register(externalIncome)
class externalIncomeAdmin(admin.ModelAdmin):
    list_display = (
        'source',
        'type',
        'amount',
        'expenses',
        'total',
        'date',
    )
    list_filter = (
        'source',
        'type',
        'amount',
        'expenses',
        'total',
        'date',
    )
    search_fields = (
        'source',
        'type',
    )
    ordering = (
        'id',
        'amount',
        'expenses',
        'total',
    )

@admin.register(externalExpense)
class externalExpenseAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'beneficiary',
        'type',
        'expenses',
        'date',
    )
    list_filter = (
        'beneficiary',
        'type',
        'expenses',
        'date',
    )
    search_fields = (
        'beneficiary',
        'type',
    )
    ordering = (
        'id',
        'expenses',
    )