const merchantData = {
  transactions: [
    { id: 1, time: "09:00", amount: 120, category: "Groceries", customerType: "new" },
    { id: 2, time: "10:30", amount: 250, category: "Dairy", customerType: "repeat" },
    { id: 3, time: "12:00", amount: 180, category: "Snacks", customerType: "new" },
    { id: 4, time: "14:00", amount: 300, category: "Groceries", customerType: "repeat" },
    { id: 5, time: "16:30", amount: 220, category: "Beverages", customerType: "new" },
    { id: 6, time: "18:00", amount: 450, category: "Groceries", customerType: "repeat" },
    { id: 7, time: "19:00", amount: 700, category: "Snacks", customerType: "repeat" },
    { id: 8, time: "20:00", amount: 650, category: "Dairy", customerType: "new" },
    { id: 9, time: "21:00", amount: 500, category: "Beverages", customerType: "repeat" }
  ],
  dailySales: [
    { day: "Mon", sales: 2200 },
    { day: "Tue", sales: 2500 },
    { day: "Wed", sales: 2100 },
    { day: "Thu", sales: 2800 },
    { day: "Fri", sales: 3200 },
    { day: "Sat", sales: 3600 },
    { day: "Sun", sales: 2900 }
  ]
};

export default merchantData;
