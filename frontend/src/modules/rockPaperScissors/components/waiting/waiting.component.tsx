import { Layout } from '../../shared/components/layout';

export const Waiting = () => {
  const url = window.location.href;

  const copyToClipboard = async () => {
    try {
      const permissions = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      if (permissions.state === 'granted' || permissions.state === 'prompt') {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error(
          "Can't access the clipboard. Check your browser permissions."
        );
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold">Waiting for player</h1>
        </div>

        <button
          className="bg-orange-400 text-xs uppercase hover:bg-orange-300 text-gray-800 font-semibold py-2 px-3 rounded shadow"
          onClick={copyToClipboard}
        >
          Share this link with your friend
        </button>
      </div>
    </Layout>
  );
};
