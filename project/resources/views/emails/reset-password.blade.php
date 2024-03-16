<x-mail::message>
You are receiving this email because we received a password reset request for your account.
Click the button below to reset your password:
 
<x-mail::button :url="$url">
Reset Password
</x-mail::button>
 
If you did not request a password reset, no further action is required.

Sincerely,<br>
{{ config('app.name') }}
</x-mail::message>
