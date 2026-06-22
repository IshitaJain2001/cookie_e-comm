import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Bell, Lock, Palette, Globe } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Cookie Tin',
    siteEmail: 'hello@cookietin.com',
    sitePhone: '+91 98765 43210',
    currency: 'INR',
    enableNotifications: true,
    enableDarkMode: false,
    maintenanceMode: false
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save settings logic would go here
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-brown-900">Settings</h1>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-semibold"
          >
            Settings saved successfully!
          </motion.div>
        )}
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-brown-600" />
          <h2 className="font-serif text-xl font-bold text-brown-900">General Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Site Email</label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Site Phone</label>
            <input
              type="tel"
              value={settings.sitePhone}
              onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-brown-600" />
          <h2 className="font-serif text-xl font-bold text-brown-900">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-cream-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-brown-900">Email Notifications</p>
              <p className="text-sm text-brown-600">Receive email notifications for new orders</p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableNotifications}
              onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
              className="w-5 h-5 rounded"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-cream-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-brown-900">Order Confirmations</p>
              <p className="text-sm text-brown-600">Send order confirmation emails to customers</p>
            </div>
            <input
              type="checkbox"
              checked={true}
              className="w-5 h-5 rounded"
            />
          </label>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-brown-600" />
          <h2 className="font-serif text-xl font-bold text-brown-900">Appearance</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-cream-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-brown-900">Dark Mode</p>
              <p className="text-sm text-brown-600">Enable dark mode for the admin panel</p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableDarkMode}
              onChange={(e) => setSettings({ ...settings, enableDarkMode: e.target.checked })}
              className="w-5 h-5 rounded"
            />
          </label>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-brown-600" />
          <h2 className="font-serif text-xl font-bold text-brown-900">Security</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-cream-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-semibold text-brown-900">Maintenance Mode</p>
              <p className="text-sm text-brown-600">Put the site in maintenance mode</p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-5 h-5 rounded"
            />
          </label>
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        <Save className="w-5 h-5 mr-2" />
        Save Settings
      </Button>
    </div>
  )
}

export default Settings
