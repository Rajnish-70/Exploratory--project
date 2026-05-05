"use client"

import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import { PencilLine, Plus, Save, X } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type StockItem = {
  id: number;
  name: string;
  used: string;
  left: string;
  intake: string;
  previous: string;
};

type StockFormState = {
  name: string;
};

const initialStockItems: StockItem[] = [
  { id: 1, name: 'Wheat', used: '0', left: '0', intake: '0', previous: '0' },
  { id: 2, name: 'Rice', used: '0', left: '0', intake: '0', previous: '0' },
  { id: 3, name: 'Dal', used: '0', left: '0', intake: '0', previous: '0' },
  { id: 4, name: 'Oil', used: '0', left: '0', intake: '0', previous: '0' },
];

const emptyStockForm = (): StockFormState => ({
  name: '',
});

export default function StaffMeals() {
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
  const [isStockEditorOpen, setIsStockEditorOpen] = useState(false);
  const [stockForm, setStockForm] = useState<StockFormState>(emptyStockForm());
  const [billDocumentName, setBillDocumentName] = useState('');
  const billInputRef = useRef<HTMLInputElement>(null);

  const totalUsedLabel = useMemo(() => `${stockItems.length} materials tracked`, [stockItems.length]);

  const openStockEditor = () => {
    setStockForm(emptyStockForm());
    setIsStockEditorOpen(true);
  };

  const handleAddStockItem = () => {
    const name = stockForm.name.trim();

    if (!name) {
      return;
    }

    setStockItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        used: '0',
        left: '0',
        intake: '0',
        previous: '0',
      },
    ]);
    setStockForm(emptyStockForm());
  };

  const handleRemoveStockItem = (itemId: number) => {
    setStockItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleStockFieldChange = (
    itemId: number,
    field: 'name' | 'used' | 'left' | 'intake' | 'previous',
    value: string
  ) => {
    setStockItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmitStockReport = () => {
    console.log('Submitting stock report:', stockItems);
    setStockItems((prev) =>
      prev.map((item) => ({
        ...item,
        previous: item.left,
        intake: '0',
        used: '0',
        left: '0',
      }))
    );
    alert('Stock regulation report submitted successfully.');
  };

  const handleSaveStockReport = () => {
    console.log('Saving stock report draft:', stockItems);
    alert('Stock regulation report saved successfully.');
  };

  const handleBillDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setBillDocumentName(file.name);
    console.log('Submitting bill document:', file.name);
    alert('Bill submitted successfully.');
    event.target.value = '';
  };

  const handleSubmitBill = () => {
    billInputRef.current?.click();
  };

  return (
    <DashboardLayout role="staff">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary">Stock Management</h2>
            <p className="text-muted-foreground">Manage stock records, bill uploads, and daily regulation entries.</p>
          </div>
          <Badge className="w-fit bg-accent px-3 py-1 text-sm">Daily Stock Desk</Badge>
        </div>

        <Card className="border-t-4 border-t-accent">
          <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-headline font-bold">Stock Regulation</CardTitle>
              <CardDescription>Monitor food materials and today&apos;s stock usage.</CardDescription>
              {billDocumentName && (
                <p className="text-xs text-muted-foreground">Last bill submitted: {billDocumentName}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={billInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleBillDocumentChange}
              />
              <Button className="bg-primary" size="sm" onClick={handleSubmitBill}>
                Submit Bill
              </Button>
              <Button variant="outline" size="sm" onClick={openStockEditor}>
                <PencilLine className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-accent/5 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-primary">Stock Register</p>
                <p className="text-xs text-muted-foreground">Add or remove items from the daily materials list.</p>
              </div>
              <Badge variant="secondary">{totalUsedLabel}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {stockItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-sky-500/5 p-3 shadow-sm">
                  <div className="grid gap-3 xl:grid-cols-5">
                    <div className="rounded-lg border border-blue-200 bg-background p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Material Name</p>
                      <Input
                        value={item.name}
                        onChange={(event) => handleStockFieldChange(item.id, 'name', event.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 text-base font-bold text-primary shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <div className="rounded-lg border border-violet-200 bg-background p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Previous Stock</p>
                      <Input
                        value={item.previous}
                        onChange={(event) => handleStockFieldChange(item.id, 'previous', event.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <div className="rounded-lg border border-emerald-200 bg-background p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Stock Intake</p>
                      <Input
                        value={item.intake}
                        onChange={(event) => handleStockFieldChange(item.id, 'intake', event.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-background p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Stock Used</p>
                      <Input
                        value={item.used}
                        onChange={(event) => handleStockFieldChange(item.id, 'used', event.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <div className="rounded-lg border border-cyan-200 bg-background p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Stock Left</p>
                      <Input
                        value={item.left}
                        onChange={(event) => handleStockFieldChange(item.id, 'left', event.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button variant="outline" onClick={handleSaveStockReport}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button className="bg-primary" onClick={handleSubmitStockReport}>
                Submit Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isStockEditorOpen} onOpenChange={setIsStockEditorOpen}>
          <DialogContent className="sm:max-w-[720px]">
            <DialogHeader>
              <DialogTitle>Edit Stock Items</DialogTitle>
              <DialogDescription>Add new materials or remove items from the stock regulation card.</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              <div className="rounded-lg border bg-muted/20 p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div className="grid gap-2">
                    <Label htmlFor="material-name">Material Name</Label>
                    <Input
                      id="material-name"
                      value={stockForm.name}
                      onChange={(event) => setStockForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="e.g. Wheat"
                    />
                  </div>
                  <Button className="bg-primary md:min-w-[140px]" onClick={handleAddStockItem}>
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Current Stock Materials</p>
                    <p className="text-xs text-muted-foreground">{stockItems.length} items in the list</p>
                  </div>
                </div>
                <div className="divide-y">
                  {stockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Previous: {item.previous}</p>
                        <p className="text-sm text-muted-foreground">Intake: {item.intake}</p>
                        <p className="text-sm text-muted-foreground">Used: {item.used}</p>
                        <p className="text-sm text-muted-foreground">Left: {item.left}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveStockItem(item.id)}>
                        <X className="mr-2 h-4 w-4" /> Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
