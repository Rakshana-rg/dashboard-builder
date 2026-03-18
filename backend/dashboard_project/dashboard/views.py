from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order
from django.db.models import Sum, Count

class DashboardStats(APIView):
    def get(self, request):
        total_orders = Order.objects.count()
        total_revenue = Order.objects.aggregate(total=Sum('total_amount'))['total'] or 0
        completed_orders = Order.objects.filter(status='Completed').count()
        pending_orders = Order.objects.filter(status='Pending').count()

        data = {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "completed_orders": completed_orders,
            "pending_orders": pending_orders,
        }
        return Response(data)