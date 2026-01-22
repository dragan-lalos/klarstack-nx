import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useMe } from '../features/me/me.query';
import { useUpdateMe } from '../features/me/update-me.mutation';
import { PageHeader } from '../shared/patterns';
import { Button } from '../shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/ui/card';
import { Input } from '../shared/ui/input';
import { Select } from '../shared/ui/select';
import { Switch } from '../shared/ui/switch';
import { useToast } from '../shared/ui/toast';

interface SettingsFormValues {
  displayName: string;
  timezone: string;
  notifications: boolean;
}

const timezoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'Europe/London', label: 'London' },
];

/**
 * Settings page connected to backend.
 */
export const SettingsPage = () => {
  const { toast } = useToast();
  const { user, isLoading } = useMe();
  const { updateMeAsync, isPending } = useUpdateMe();

  const { register, handleSubmit, control, reset } = useForm<SettingsFormValues>({
    defaultValues: {
      displayName: '',
      timezone: 'UTC',
      notifications: true,
    },
  });

  // Load user data when available
  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName || '',
        timezone: user.timezone || 'UTC',
        notifications: user.emailNotifications ?? true,
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateMeAsync({
        displayName: data.displayName,
        timezone: data.timezone,
        emailNotifications: data.notifications,
      });
      toast({ title: 'Saved', description: 'Your settings were updated.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save settings. Please try again.' });
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Settings" subtitle="Manage profile and notification preferences." />
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Loading settings...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage profile and notification preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display name
              </label>
              <Input id="displayName" placeholder="Display name" {...register('displayName')} />
            </div>

            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">
                Timezone
              </label>
              <Controller
                name="timezone"
                control={control}
                render={({ field }) => <Select id="timezone" options={timezoneOptions} {...field} />}
              />
            </div>

            <Controller
              name="notifications"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  label="Enable email notifications"
                />
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
