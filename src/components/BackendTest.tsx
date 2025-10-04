import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const BackendTest = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setResponse(data);
      
      toast({
        title: "Success",
        description: "Successfully connected to backend!",
      });
    } catch (error) {
      console.error('Error connecting to backend:', error);
      toast({
        title: "Error",
        description: "Failed to connect to backend. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Backend Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              />
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Testing...' : 'Test Backend Connection'}
            </Button>
          </form>
          
          {response && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Backend Response:</h3>
              <pre className="text-sm bg-background p-2 rounded">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BackendTest;