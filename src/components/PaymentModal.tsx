import { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Course } from '../App';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onComplete: () => void;
}

export function PaymentModal({ course, onClose, onComplete }: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>

        <div className="p-8">
          <h2 className="mb-2">Complete Your Purchase</h2>
          <p className="text-gray-600 mb-6">
            Secure payment powered by Stripe
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm mb-1">{course.title}</div>
                <div className="text-xs text-gray-600">{course.instructor}</div>
              </div>
              <div className="text-blue-600">${course.price}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Lock className="size-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total</span>
                <span className="text-blue-600">${course.price}</span>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${course.price}`}
              </Button>
            </div>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
