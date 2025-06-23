"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/merchant/common/Header/Header";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiStore,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";
import withAuth from "@/hoc/withAuth";
import useFetch from "@/hooks/api/useFetch";
import { useMerchant } from "@/hooks/useMerchant";

// 模擬多租戶數據
const mockData = {
  老張牛肉麵: {
    id: 1,
    name: "老張牛肉麵",
    status: "active",
    revenue: {
      today: 12580,
      thisWeek: 65420,
      thisMonth: 186750,
      change: 15.3,
    },
    orders: {
      total: 148,
      pending: 6,
      preparing: 12,
      ready: 3,
      completed: 127,
      cancelled: 2,
    },
    products: {
      total: 25,
      active: 23,
      outOfStock: 2,
      lowStock: 4,
    },
    customers: {
      total: 1250,
      new: 18,
      returning: 89,
    },
    chart: {
      revenue: [
        { name: "00:00", value: 0 },
        { name: "06:00", value: 450 },
        { name: "12:00", value: 3200 },
        { name: "18:00", value: 6800 },
        { name: "21:00", value: 2130 },
      ],
      orders: [
        { name: "週一", orders: 45, revenue: 8500 },
        { name: "週二", orders: 52, revenue: 9200 },
        { name: "週三", orders: 38, revenue: 7100 },
        { name: "週四", orders: 61, revenue: 11200 },
        { name: "週五", orders: 78, revenue: 14500 },
        { name: "週六", orders: 89, revenue: 16800 },
        { name: "週日", orders: 67, revenue: 12300 },
      ],
      categories: [
        { name: "牛肉麵", value: 35, color: "#3b82f6" },
        { name: "小菜", value: 25, color: "#10b981" },
        { name: "湯品", value: 20, color: "#f59e0b" },
        { name: "飲料", value: 20, color: "#ef4444" },
      ],
    },
  },
  小李火鍋店: {
    id: 2,
    name: "小李火鍋店",
    status: "active",
    revenue: {
      today: 28450,
      thisWeek: 142300,
      thisMonth: 567800,
      change: 22.7,
    },
    orders: {
      total: 89,
      pending: 3,
      preparing: 8,
      ready: 2,
      completed: 74,
      cancelled: 2,
    },
    products: {
      total: 45,
      active: 42,
      outOfStock: 3,
      lowStock: 6,
    },
    customers: {
      total: 2100,
      new: 25,
      returning: 156,
    },
    chart: {
      revenue: [
        { name: "00:00", value: 0 },
        { name: "06:00", value: 1200 },
        { name: "12:00", value: 8500 },
        { name: "18:00", value: 15200 },
        { name: "21:00", value: 3550 },
      ],
      orders: [
        { name: "週一", orders: 32, revenue: 15600 },
        { name: "週二", orders: 28, revenue: 13400 },
        { name: "週三", orders: 35, revenue: 16800 },
        { name: "週四", orders: 42, revenue: 20100 },
        { name: "週五", orders: 58, revenue: 27800 },
        { name: "週六", orders: 65, revenue: 31200 },
        { name: "週日", orders: 48, revenue: 23000 },
      ],
      categories: [
        { name: "火鍋套餐", value: 40, color: "#3b82f6" },
        { name: "肉類", value: 30, color: "#10b981" },
        { name: "蔬菜", value: 15, color: "#f59e0b" },
        { name: "飲料", value: 15, color: "#ef4444" },
      ],
    },
  },
  阿美早餐店: {
    id: 3,
    name: "阿美早餐店",
    status: "active",
    revenue: {
      today: 8920,
      thisWeek: 45600,
      thisMonth: 198500,
      change: -5.2,
    },
    orders: {
      total: 256,
      pending: 8,
      preparing: 15,
      ready: 5,
      completed: 225,
      cancelled: 3,
    },
    products: {
      total: 18,
      active: 16,
      outOfStock: 2,
      lowStock: 3,
    },
    customers: {
      total: 890,
      new: 12,
      returning: 78,
    },
    chart: {
      revenue: [
        { name: "05:00", value: 1200 },
        { name: "07:00", value: 3800 },
        { name: "09:00", value: 2900 },
        { name: "11:00", value: 1020 },
        { name: "13:00", value: 0 },
      ],
      orders: [
        { name: "週一", orders: 68, revenue: 7800 },
        { name: "週二", orders: 72, revenue: 8200 },
        { name: "週三", orders: 65, revenue: 7400 },
        { name: "週四", orders: 78, revenue: 8900 },
        { name: "週五", orders: 82, revenue: 9400 },
        { name: "週六", orders: 45, revenue: 5200 },
        { name: "週日", orders: 38, revenue: 4300 },
      ],
      categories: [
        { name: "漢堡", value: 30, color: "#3b82f6" },
        { name: "三明治", value: 25, color: "#10b981" },
        { name: "蛋餅", value: 25, color: "#f59e0b" },
        { name: "飲料", value: 20, color: "#ef4444" },
      ],
    },
  },
};

const StatCard = ({ title, value, change, icon: Icon, trend }) => {
  const isPositive = change > 0;

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p
            className="text-2xl font-bold text-gray-900 dark:text-gray-100
dark:text-gray-100"
          >
            {value}
          </p>
          {change !== undefined && (
            <div
              className={`flex items-center mt-2 text-sm ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? (
                <FiTrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <FiTrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

const OrderStatusCard = ({ title, count, status, color }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <FiClock className={`w-5 h-5 text-${color}-600`} />;
      case "preparing":
        return <FiRefreshCw className={`w-5 h-5 text-${color}-600`} />;
      case "ready":
        return <FiCheckCircle className={`w-5 h-5 text-${color}-600`} />;
      case "cancelled":
        return <FiX className={`w-5 h-5 text-${color}-600`} />;
      default:
        return <FiPackage className={`w-5 h-5 text-${color}-600`} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p
            className="text-xl font-bold text-gray-900 dark:text-gray-100
dark:text-gray-100"
          >
            {count}
          </p>
        </div>
        <div
          className={`w-10 h-10 bg-${color}-50 rounded-lg flex items-center justify-center`}
        >
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

function Dashboard({ user }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState("老張牛肉麵");
  const [currentData, setCurrentData] = useState(mockData["老張牛肉麵"]);
  const { merchant, setCurrentMerchant, clearCurrentMerchant } = useMerchant();

  const url = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const { data, loading, refetch } = useFetch(url, {
    withCredentials: true,
    enabled: false,
  });

  // ✅ 自動設置 merchant
  useEffect(() => {
    if (!merchant && user) {
      refetch().then((result) => {
        if (result?.length > 0) {
          setCurrentMerchant(result[0]);
        }
      });
    }
  }, [merchant, user, refetch, setCurrentMerchant]);

  useEffect(() => {
    setCurrentData(mockData[selectedRestaurant]);
  }, [selectedRestaurant]);

  useEffect(() => {}, []);
  const formatCurrency = (amount) => {
    return `NT$ ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header name={"Dashboard"} user={user} status={"active"} />
      <div className="space-y-6">
        {/* 主要統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="今日營收"
            value={formatCurrency(currentData.revenue.today)}
            change={currentData.revenue.change}
            icon={FiDollarSign}
          />
          <StatCard
            title="總訂單數"
            value={currentData.orders.total}
            icon={FiShoppingCart}
          />
          <StatCard
            title="商品總數"
            value={currentData.products.total}
            icon={FiPackage}
          />
          <StatCard
            title="客戶總數"
            value={currentData.customers.total}
            icon={FiUsers}
          />
        </div>

        {/* 訂單狀態概覽 */}
        <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
          >
            訂單狀態
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <OrderStatusCard
              title="待處理"
              count={currentData.orders.pending}
              status="pending"
              color="yellow"
            />
            <OrderStatusCard
              title="準備中"
              count={currentData.orders.preparing}
              status="preparing"
              color="blue"
            />
            <OrderStatusCard
              title="待取餐"
              count={currentData.orders.ready}
              status="ready"
              color="green"
            />
            <OrderStatusCard
              title="已完成"
              count={currentData.orders.completed}
              status="completed"
              color="gray"
            />
            <OrderStatusCard
              title="已取消"
              count={currentData.orders.cancelled}
              status="cancelled"
              color="red"
            />
          </div>
        </div>

        {/* 圖表區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 今日營收趨勢 */}
          <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
            >
              今日營收趨勢
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData.chart.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "營收"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 銷售類別分布 */}
          <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
            >
              銷售類別分布
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentData.chart.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {currentData.chart.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 週營收和訂單趨勢 */}
        <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
          >
            本週營收與訂單趨勢
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentData.chart.orders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? formatCurrency(value) : value,
                  name === "revenue" ? "營收" : "訂單數",
                ]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="orders"
                fill="#3b82f6"
                name="訂單數"
              />
              <Bar
                yAxisId="right"
                dataKey="revenue"
                fill="#10b981"
                name="營收"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 商品和客戶狀態 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 商品狀態 */}
          <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
            >
              商品狀態
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FiCheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">正常供應</span>
                </div>
                <span className="text-xl font-bold text-green-900">
                  {currentData.products.active}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <FiX className="w-5 h-5 text-red-600 mr-3" />
                  <span className="font-medium text-red-900">缺貨</span>
                </div>
                <span className="text-xl font-bold text-red-900">
                  {currentData.products.outOfStock}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="font-medium text-yellow-900">庫存不足</span>
                </div>
                <span className="text-xl font-bold text-yellow-900">
                  {currentData.products.lowStock}
                </span>
              </div>
            </div>
          </div>

          {/* 客戶狀態 */}
          <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 p-6">
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-gray-100
dark:text-gray-100 mb-4"
            >
              客戶概況
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FiUsers className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-900">總客戶數</span>
                </div>
                <span className="text-xl font-bold text-blue-900">
                  {currentData.customers.total}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FiTrendingUp className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">新客戶</span>
                </div>
                <span className="text-xl font-bold text-green-900">
                  {currentData.customers.new}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <FiRefreshCw className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-900">回頭客</span>
                </div>
                <span className="text-xl font-bold text-purple-900">
                  {currentData.customers.returning}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
