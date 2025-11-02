import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Globe, BarChart3, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your portfolio and track your progress</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="text-gray-600 text-sm">Profile Views</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">89</div>
                  <div className="text-gray-600 text-sm">Countries</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">45</div>
                  <div className="text-gray-600 text-sm">Contact Requests</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600 text-sm">Uptime</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Portfolio Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Portfolio</h3>
                <p className="text-gray-600 mb-6">
                  Start building your professional portfolio with our easy-to-use editor.
                </p>
                <Link to="/editor">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Your Portfolio</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Published
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">URL:</span>
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    spotme.com/johndoe
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="text-gray-900">2 days ago</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Link to="/editor" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900">Portfolio viewed by visitor from United States</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900">Contact form submission received</p>
                  <p className="text-gray-500 text-sm">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900">Portfolio updated</p>
                  <p className="text-gray-500 text-sm">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};