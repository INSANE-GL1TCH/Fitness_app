import React, { useState, useEffect } from 'react';
import { getBMI, deleteBMI, getMeals, deleteMeal } from '../services/api';
import { toast } from 'react-hot-toast';
import { History as HistoryIcon, Scale, Flame, Trash2, Calendar } from 'lucide-react';

// --- Helpers ---
const calculateCalories = (p, c, f) => (p * 4) + (c * 4) + (f * 9);

const getBMICategory = (bmi) => {
  const b = parseFloat(bmi);
  if (b < 18.5) return { text: 'Underweight', color: 'text-blue-500 bg-blue-50' };
  if (b >= 18.5 && b < 25) return { text: 'Normal', color: 'text-green-500 bg-green-50' };
  if (b >= 25 && b < 30) return { text: 'Overweight', color: 'text-orange-500 bg-orange-50' };
  return { text: 'Obese', color: 'text-red-500 bg-red-50' };
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const History = () => {
  const [bmiRecords, setBmiRecords] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [bmiRes, mealRes] = await Promise.all([getBMI(), getMeals()]);
      // Sort so newest records are at the top
      const sortedBmi = (bmiRes.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const sortedMeals = (mealRes.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setBmiRecords(sortedBmi);
      setMeals(sortedMeals);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBMI = async (id) => {
    if (!window.confirm('Delete this BMI record?')) return;
    try {
      await deleteBMI(id);
      toast.success('Record deleted');
      setBmiRecords(bmiRecords.filter(record => record.id !== id));
    } catch (err) { toast.error('Failed to delete'); }
  };

  const handleDeleteMeal = async (id) => {
    if (!window.confirm('Delete this meal?')) return;
    try {
      await deleteMeal(id);
      toast.success('Meal deleted');
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (err) { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500"><HistoryIcon className="animate-spin w-12 h-12" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
          <HistoryIcon size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your History</h1>
          <p className="text-gray-500 font-medium mt-1">Review your past logs and track your progress over time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: BMI History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[700px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Scale className="text-blue-500" size={24}/>
              <h2 className="text-xl font-bold text-gray-900">BMI Logbook</h2>
            </div>
            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{bmiRecords.length} Records</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {bmiRecords.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No BMI records found.</p>
            ) : (
              bmiRecords.map((r) => {
                const category = getBMICategory(r.bmi);
                return (
                  <div key={r.id} className="group relative p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all bg-gray-50 hover:bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar size={14} /> {formatDate(r.createdAt)}
                      </div>
                      <button onClick={() => handleDeleteBMI(r.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute right-2 top-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <div>
                        <span className="text-3xl font-black text-gray-900">{r.bmi}</span>
                        <span className="text-gray-500 ml-2 font-medium">{r.weight}kg | {r.height}cm</span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider ${category.color}`}>
                        {category.text}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT: Meals History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[700px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={24}/>
              <h2 className="text-xl font-bold text-gray-900">Nutrition Logbook</h2>
            </div>
            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{meals.length} Meals</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {meals.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No meals logged yet.</p>
            ) : (
              meals.map((m) => (
                <div key={m.id} className="group relative p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all bg-gray-50 hover:bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <Calendar size={14} /> {formatDate(m.createdAt)}
                    </div>
                    <button onClick={() => handleDeleteMeal(m.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute right-2 top-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-lg font-bold text-gray-900">{m.type}</h3>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <div className="flex gap-4 text-sm font-medium">
                      <span className="text-gray-600">P: <span className="text-gray-900">{m.protein}g</span></span>
                      <span className="text-gray-600">C: <span className="text-gray-900">{m.carbs}g</span></span>
                      <span className="text-gray-600">F: <span className="text-gray-900">{m.fats}g</span></span>
                    </div>
                    <span className="text-lg font-black text-orange-500">
                      {Math.round(calculateCalories(m.protein, m.carbs, m.fats))} <span className="text-xs text-gray-500 font-medium uppercase">kcal</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default History;