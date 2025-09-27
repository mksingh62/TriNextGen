import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cookie, Shield, Settings, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Delay to avoid being too intrusive
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consentType: 'accepted' | 'declined' | 'custom') => {
    const consentData = {
      type: consentType,
      timestamp: new Date().toISOString(),
      preferences: consentType === 'custom' ? cookiePreferences : null,
    };
    
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    toast({
      title: `Cookies ${consentType}`,
      description: `Your cookie preferences have been saved.`,
      duration: 3000,
    });
  };

  const handlePreferenceChange = (type: keyof typeof cookiePreferences) => {
    if (type === 'necessary') return; // Necessary cookies can't be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => handleConsent('declined')}
      />
      
      {/* Cookie Popup */}
      <div className="relative w-full max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground">Cookie Preferences</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Shield className="w-3 h-3 mr-1" />
                      Privacy
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies to enhance your browsing experience, provide personalized content, 
                    and analyze our traffic. You can customize your preferences below.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                  onClick={() => handleConsent('declined')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Cookie Details */}
            {showDetails && (
              <div className="px-6 pb-4 border-t border-border/50">
                <div className="space-y-4 pt-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground">Necessary Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Essential for website functionality and security.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Always Active</span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground">Analytics Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <Button
                      variant={cookiePreferences.analytics ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePreferenceChange('analytics')}
                    >
                      {cookiePreferences.analytics ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground">Marketing Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Used to deliver relevant advertisements and track campaign performance.
                      </p>
                    </div>
                    <Button
                      variant={cookiePreferences.marketing ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePreferenceChange('marketing')}
                    >
                      {cookiePreferences.marketing ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="p-6 pt-4 border-t border-border/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {showDetails ? 'Hide Details' : 'Customize'}
                </Button>
                
                <div className="flex gap-3 flex-grow sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleConsent('declined')}
                    className="flex-grow sm:flex-grow-0"
                  >
                    Decline All
                  </Button>
                  <Button
                    onClick={() => handleConsent('custom')}
                    variant="outline"
                    className="flex-grow sm:flex-grow-0"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    onClick={() => handleConsent('accepted')}
                    className="flex-grow sm:flex-grow-0 bg-primary hover:bg-primary/90"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookieConsent;