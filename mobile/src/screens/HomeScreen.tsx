import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf, Award, Users, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Leaf size={48} color="#10b981" />
        <Text style={styles.title}>EcoPulse</Text>
        <Text style={styles.subtitle}>Earn rewards for eco-friendly actions</Text>
      </View>

      <View style={styles.features}>
        <FeatureCard
          icon={<Leaf size={32} color="#10b981" />}
          title="Complete Tasks"
          description="Plant trees, recycle, use public transport"
        />
        <FeatureCard
          icon={<Award size={32} color="#10b981" />}
          title="Earn EcoCoin"
          description="AI verifies your actions and rewards you"
        />
        <FeatureCard
          icon={<Users size={32} color="#10b981" />}
          title="Join Events"
          description="Participate in community eco-events"
        />
        <FeatureCard
          icon={<TrendingUp size={32} color="#10b981" />}
          title="Use Tokens"
          description="Pay bills and make purchases"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <View style={styles.card}>
      {icon}
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  features: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  secondaryButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
