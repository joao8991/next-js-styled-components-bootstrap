import StyledComponentsRegistry from '@/lib/registry';

import ClientSideConfigs from '@/config/ClientSideConfigs';

export const metadata = {
  description:
    'page description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClientSideConfigs>{children}</ClientSideConfigs>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
