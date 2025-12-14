import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('./DashboardClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'My Dashboard | OpenGov Compliance Center',
  description: 'Your personalized compliance monitoring dashboard',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
