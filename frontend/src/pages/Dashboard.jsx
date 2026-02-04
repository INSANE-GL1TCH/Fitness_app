import React, { useState, useEffect } from 'react';
import { Activity, Flame, Target, TrendingUp, Scale, Utensils, Dumbbell, Heart, Calendar, Award, ChevronRight, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [bmiData, setBmiData] = useState({ weight: 70, height: 170 });
  const [meals, setMeals] = useState([]);
  const [showBmiCalc, setShowBmiCalc] = useState(false);
  const [showPortionControl, setShowPortionControl] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const calculateBMI = () => {
    const heightInMeters = bmiData.height / 100;
    const bmi = (bmiData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-yellow-400' };
    return { text: 'Obese', color: 'text-red-400' };
  };

  const addMeal = (mealType, protein, carbs, fats) => {
    setMeals([...meals, { id: Date.now(), type: mealType, protein, carbs, fats, time: new Date().toLocaleTimeString() }]);
  };

  const totalMacros = meals.reduce((acc, meal) => ({
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { protein: 0, carbs: 0, fats: 0 });

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-transparent to-orange-600" 
             style={{ 
               backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,140,0,.1) 35px, rgba(255,140,0,.1) 70px)',
               animation: 'slide 20s linear infinite'
             }}>
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Work Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Oswald', sans-serif;
          letter-spacing: -0.02em;
        }
        
        @keyframes slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 140, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 140, 0, 0.6); }
        }
        
        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .glow-orange {
          box-shadow: 0 4px 24px rgba(255, 140, 0, 0.4);
        }
        
        .diagonal-cut {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(255, 140, 0, 0.3);
        }
      `}</style>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-orange-500/20">
        <div className={`flex items-center gap-3 ${animateIn ? 'animate-in' : 'opacity-0'}`}>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center rotate-6 hover:rotate-0 transition-transform">
            <Flame className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">FIT<span className="text-orange-500">CLUB</span></h1>
        </div>
        
        <nav className={`hidden md:flex items-center gap-8 ${animateIn ? 'animate-in stagger-1' : 'opacity-0'}`}>
          <a href="#" className="text-sm font-medium hover:text-orange-500 transition">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:text-orange-500 transition">Workouts</a>
          <a href="#" className="text-sm font-medium hover:text-orange-500 transition">Nutrition</a>
          <a href="#" className="text-sm font-medium hover:text-orange-500 transition">Progress</a>
        </nav>
        
        <button className={`bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-full transition flex items-center gap-2 ${animateIn ? 'animate-in stagger-2' : 'opacity-0'}`}>
          <Award className="w-4 h-4" />
          Premium
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className={`${animateIn ? 'animate-in' : 'opacity-0'}`}>
              <h2 className="text-7xl md:text-8xl font-display font-bold leading-none mb-4 italic">
                NO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">EXCUSES</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-md">
                Transform your body, elevate your mind, and unleash the strength you never knew you had
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-4 rounded-full text-lg transition glow-orange flex items-center gap-3 group">
                Start Training
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              
              <div className="flex gap-12 mt-12">
                <div>
                  <div className="text-4xl font-display font-bold">5.3K</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold">260K</div>
                  <div className="text-sm text-gray-500">Workouts Logged</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold">80+</div>
                  <div className="text-sm text-gray-500">Exercise Types</div>
                </div>
              </div>
            </div>
            
            <div className={`relative ${animateIn ? 'animate-in stagger-2' : 'opacity-0'}`}>
              <div className="diagonal-cut bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 border border-orange-500/30">
                <div className="text-right">
                  <div className="text-8xl font-display font-bold text-orange-500 leading-none italic">JUST</div>
                  <div className="text-8xl font-display font-bold text-orange-500 leading-none italic">RESULTS</div>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                    <TrendingUp className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Flame, label: 'Calories Burned', value: '2,847', unit: 'kcal', color: 'from-orange-500 to-red-500' },
              { icon: Dumbbell, label: 'Workouts', value: '24', unit: 'this month', color: 'from-orange-500 to-yellow-500' },
              { icon: Heart, label: 'Avg Heart Rate', value: '142', unit: 'bpm', color: 'from-red-500 to-pink-500' },
              { icon: Activity, label: 'Active Minutes', value: '487', unit: 'mins', color: 'from-green-500 to-emerald-500' }
            ].map((stat, i) => (
              <div key={i} className={`bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover-lift ${animateIn ? 'animate-in' : 'opacity-0'}`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xs text-gray-600 mt-1">{stat.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features - BMI Tracker & Portion Control */}
      <section className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-4xl font-display font-bold">
              SPECIAL <span className="text-orange-500">FEATURES</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* BMI Tracker */}
            <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border-2 border-orange-500/40 hover-lift ${animateIn ? 'animate-in stagger-3' : 'opacity-0'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Scale className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-bold">BMI TRACKER</h4>
                    <p className="text-sm text-gray-500">Track your body mass index</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBmiCalc(!showBmiCalc)}
                  className="text-orange-500 hover:text-orange-400 transition"
                >
                  {showBmiCalc ? '−' : '+'}
                </button>
              </div>

              {showBmiCalc ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={bmiData.weight}
                      onChange={(e) => setBmiData({...bmiData, weight: parseFloat(e.target.value)})}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Height (cm)</label>
                    <input 
                      type="number" 
                      value={bmiData.height}
                      onChange={(e) => setBmiData({...bmiData, height: parseFloat(e.target.value)})}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-6 bg-black/40 rounded-2xl p-6 border border-orange-500/20">
                <div className="text-center">
                  <div className="text-6xl font-display font-bold text-orange-500 mb-2">{calculateBMI()}</div>
                  <div className={`text-lg font-semibold ${getBMICategory(calculateBMI()).color}`}>
                    {getBMICategory(calculateBMI()).text}
                  </div>
                </div>
                
                <div className="mt-6 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 transition-all"
                    style={{ width: `${Math.min((calculateBMI() / 40) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-500">
                  <div>Under<br/>(&lt;18.5)</div>
                  <div>Normal<br/>(18.5-25)</div>
                  <div>Over<br/>(25-30)</div>
                  <div>Obese<br/>(&gt;30)</div>
                </div>
              </div>
            </div>

            {/* Portion Control */}
            <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border-2 border-orange-500/40 hover-lift ${animateIn ? 'animate-in stagger-4' : 'opacity-0'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Utensils className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-bold">PORTION CONTROL</h4>
                    <p className="text-sm text-gray-500">Monitor your daily macros</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPortionControl(!showPortionControl)}
                  className="text-orange-500 hover:text-orange-400 transition"
                >
                  {showPortionControl ? '−' : '+'}
                </button>
              </div>

              {showPortionControl ? (
                <div className="mb-6 space-y-3">
                  <button 
                    onClick={() => addMeal('Breakfast', 25, 45, 12)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-4 py-3 text-left transition flex items-center justify-between"
                  >
                    <span>Add Breakfast</span>
                    <PlusCircle className="w-5 h-5 text-orange-500" />
                  </button>
                  <button 
                    onClick={() => addMeal('Lunch', 35, 60, 18)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-4 py-3 text-left transition flex items-center justify-between"
                  >
                    <span>Add Lunch</span>
                    <PlusCircle className="w-5 h-5 text-orange-500" />
                  </button>
                  <button 
                    onClick={() => addMeal('Dinner', 40, 55, 20)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-4 py-3 text-left transition flex items-center justify-between"
                  >
                    <span>Add Dinner</span>
                    <PlusCircle className="w-5 h-5 text-orange-500" />
                  </button>
                  <button 
                    onClick={() => addMeal('Snack', 10, 20, 8)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-4 py-3 text-left transition flex items-center justify-between"
                  >
                    <span>Add Snack</span>
                    <PlusCircle className="w-5 h-5 text-orange-500" />
                  </button>
                </div>
              ) : null}

              <div className="bg-black/40 rounded-2xl p-6 border border-green-500/20">
                <div className="text-sm text-gray-400 mb-4">Today's Macros</div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Protein</span>
                      <span className="text-sm font-bold text-orange-500">{totalMacros.protein}g / 150g</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: `${(totalMacros.protein / 150) * 100}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Carbs</span>
                      <span className="text-sm font-bold text-green-500">{totalMacros.carbs}g / 200g</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: `${(totalMacros.carbs / 200) * 100}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Fats</span>
                      <span className="text-sm font-bold text-yellow-500">{totalMacros.fats}g / 65g</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-600" style={{ width: `${(totalMacros.fats / 65) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {meals.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <div className="text-xs text-gray-500 mb-3">Recent Meals</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {meals.slice(-3).reverse().map(meal => (
                        <div key={meal.id} className="flex justify-between items-center text-xs bg-zinc-900/50 rounded-lg px-3 py-2">
                          <span className="text-gray-300">{meal.type}</span>
                          <span className="text-gray-500">{meal.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Workouts */}
      <section className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-4xl font-display font-bold">
              RECENT <span className="text-orange-500">WORKOUTS</span>
            </h3>
            <button className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-2">
              View All
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Upper Body Strength', duration: '45 min', calories: 387, date: 'Today', type: 'Strength' },
              { name: 'HIIT Cardio Blast', duration: '30 min', calories: 425, date: 'Yesterday', type: 'Cardio' },
              { name: 'Core & Abs Crusher', duration: '25 min', calories: 198, date: '2 days ago', type: 'Core' }
            ].map((workout, i) => (
              <div key={i} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover-lift cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition">
                    <Dumbbell className="w-6 h-6 text-orange-500 group-hover:text-black transition" />
                  </div>
                  <span className="text-xs bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full">{workout.type}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{workout.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {workout.date}
                  </div>
                  <div>•</div>
                  <div>{workout.duration}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Calories</span>
                  <span className="font-bold text-orange-500">{workout.calories} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Progress */}
      <section className="relative z-10 px-8 py-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-display font-bold mb-8">
            WEEKLY <span className="text-orange-500">PROGRESS</span>
          </h3>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <div className="flex items-end justify-between h-64 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [65, 80, 45, 90, 75, 50, 85];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-full bg-zinc-800 rounded-t-xl overflow-hidden relative hover-lift" style={{ height: `${heights[i]}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-500 transition" />
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black opacity-0 group-hover:opacity-100 transition">
                        {Math.round(heights[i] * 3)}m
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-orange-500 transition">{day}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-gray-400">Active Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Total:</span>
                <span className="font-bold text-orange-500">487 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-8 py-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" style={{ 
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,.1) 20px, rgba(0,0,0,.1) 40px)' 
            }} />
            <div className="relative z-10">
              <h3 className="text-5xl font-display font-bold text-black mb-4">READY TO TRANSFORM?</h3>
              <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                Join thousands of members crushing their goals every single day
              </p>
              <button className="bg-black hover:bg-zinc-900 text-white font-bold px-10 py-4 rounded-full text-lg transition inline-flex items-center gap-3 group">
                Start Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}