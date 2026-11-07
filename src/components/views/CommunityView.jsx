import React from 'react';
import { MessageSquare, Heart, Share2, Sparkles } from 'lucide-react';
import { Header } from '../layout/Header';
import { useAuth } from '../../context/AuthContext';
import { IMAGES } from '../../assets/images';

export function CommunityView({ onNavigate }) {
  const { currentUser, activeHorse } = useAuth();

  const posts = [
    {
      id: 'p1',
      author: 'Klara & Bellissimo',
      time: '2 timmar sedan',
      content: 'Klarade just sista passet i 4-veckorscykeln för bärighet! Skillnaden i samlad galopp är magisk.',
      likes: 24,
      comments: 6,
      image: IMAGES.heroJumping,
    },
    {
      id: 'p2',
      author: 'Marcus Berg (Tränare)',
      time: '5 timmar sedan',
      content: 'Veckans tips för alla i gruppen: Lägg 3 minuter extra på övergångar skritt-trav innan du börjar med bomserierna. Rytmen avgör allt!',
      likes: 42,
      comments: 11,
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      <Header title="Community & Inspiration" showBack={false} rightAction="bell" />

      <div className="px-5 pt-3 pb-6 space-y-4">
        {/* Banner */}
        <div className="bg-[#2F4132] text-white p-4 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#C89D66]" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C89D66]">
              Träningsgemenskap
            </h4>
            <p className="text-xs text-[#E5ECE5] mt-0.5">
              Dela framsteg och få tips från ryttare och tränare i ditt nätverk.
            </p>
          </div>
        </div>

        {/* Inlägg */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl p-4 border border-[#EAE5DC] shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E8ECE6] overflow-hidden">
                <img src={IMAGES.riderAvatar} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-equestrian-dark">{post.author}</h5>
                <span className="text-[10px] text-neutral-400">{post.time}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed">
              {post.content}
            </p>

            {post.image && (
              <div className="h-40 rounded-2xl overflow-hidden">
                <img src={post.image} alt="Träning" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-4 pt-1 text-xs text-neutral-500 border-t border-neutral-100">
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-equestrian-dark transition-colors">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </button>
              <button className="ml-auto text-neutral-400 hover:text-neutral-700">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

