'use client';

import { motion } from 'framer-motion';
import { Leaf, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Earn <span className="text-primary">EcoCoin</span> for
            <br />
            Saving the Planet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete eco-friendly tasks, join community events, and get rewarded with cryptocurrency
            that you can use for real transactions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: 'Complete Tasks', desc: 'Plant trees, recycle, use public transport' },
            { icon: Award, title: 'Earn EcoCoin', desc: 'AI verifies your actions and rewards you' },
            { icon: Users, title: 'Join Events', desc: 'Participate in community eco-events' },
            { icon: TrendingUp, title: 'Use Tokens', desc: 'Pay bills and make purchases with EcoCoin' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">For Corporations</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Offset your carbon footprint by funding community eco-events instead of paying carbon tax.
            Get verified impact reports and tax documentation.
          </p>
          <Link
            href="/corporate"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Learn About Carbon Credits
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Platform Stats</h2>
          <p className="text-gray-600">Real-time impact metrics</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { value: '50K+', label: 'Active Users' },
            { value: '2M+', label: 'Tasks Completed' },
            { value: '100K+', label: 'Trees Planted' },
          ].map((stat, i) => (
            <div key={i} className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
