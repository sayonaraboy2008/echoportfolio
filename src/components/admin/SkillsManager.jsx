import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Save, Code, Server, Wrench, Check } from 'lucide-react';

export const SkillsManager = () => {
  const { data, updateSkills, addToast } = useData();

  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    tools: [],
  });

  useEffect(() => {
    if (data.skills) {
      setSkills(data.skills);
    }
  }, [data.skills]);

  const [newSkill, setNewSkill] = useState({ category: 'frontend', name: '', level: 90 });

  const handleLevelChange = (category, index, newLevel) => {
    const updatedCategory = [...(skills[category] || [])];
    updatedCategory[index] = { ...updatedCategory[index], level: Number(newLevel) };
    setSkills({ ...skills, [category]: updatedCategory });
  };

  const handleNameChange = (category, index, newName) => {
    const updatedCategory = [...(skills[category] || [])];
    updatedCategory[index] = { ...updatedCategory[index], name: newName };
    setSkills({ ...skills, [category]: updatedCategory });
  };

  const handleDelete = (category, index) => {
    const updatedCategory = [...(skills[category] || [])].filter((_, i) => i !== index);
    setSkills({ ...skills, [category]: updatedCategory });
    addToast('Skill removed from list. Click "Save Skills" to apply.', 'info');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const cat = newSkill.category;
    const updatedCategory = [
      ...(skills[cat] || []),
      { name: newSkill.name.trim(), level: Number(newSkill.level) },
    ];
    setSkills({ ...skills, [cat]: updatedCategory });
    setNewSkill({ category: cat, name: '', level: 90 });
    addToast(`Added "${newSkill.name}". Click "Save Skills" to apply.`, 'info');
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    updateSkills(skills);
  };

  const categories = [
    { key: 'frontend', title: 'Frontend Development', icon: Code },
    { key: 'backend', title: 'APIs & Ecosystem', icon: Server },
    { key: 'tools', title: 'Tools & Workflow', icon: Wrench },
  ];

  return (
    <form onSubmit={handleSaveAll} className="space-y-8">
      {/* Header & Add form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 shadow-lg">
        <span className="text-xs font-mono font-bold text-accent-mint flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add New Tech Skill</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">APIs & Backend</option>
              <option value="tools">Tools & DevOps</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g. Next.js, GraphQL, Docker"
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Level: {newSkill.level}%
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                className="w-full accent-accent-mint cursor-pointer"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Lists */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const items = skills[cat.key] || [];

          return (
            <div
              key={cat.key}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-white font-heading font-bold">
                <Icon className="w-4 h-4 text-accent-mint" />
                <span>{cat.title}</span>
                <span className="text-xs font-mono text-slate-500 font-normal">
                  ({items.length} items)
                </span>
              </div>

              <div className="space-y-3">
                {items.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleNameChange(cat.key, index, e.target.value)}
                      className="flex-1 bg-transparent border-0 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-accent-mint px-2 py-1 rounded"
                    />

                    <div className="flex items-center gap-2 w-48">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleLevelChange(cat.key, index, e.target.value)}
                        className="w-full accent-accent-mint cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-400 w-10 text-right">
                        {skill.level}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(cat.key, index)}
                      className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-[#121721] pt-4 pb-2 border-t border-slate-800">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-lg shadow-accent-mint/20 hover:shadow-accent-mint/40"
        >
          <Save className="w-4 h-4" />
          <span>Save Skills &amp; Tech Stack</span>
        </button>
      </div>
    </form>
  );
};
