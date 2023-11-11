import { Link } from "react-router-dom";

import { Button } from "../../../../shared/components/buttons";
import { FC } from "react";

export interface GameProps {
  name: string;
  to?: string;
  disabled?: boolean;
  disableReason?: string;
}

export const Game: FC<GameProps> = ({
  name,
  to,
  disabled = false,
  disableReason,
}) => {
  return (
    <div>
      <Button disabled={disabled} variant="link" className="underline">
        {to ? <Link to={to}>{name}</Link> : <span>{name}</span>}
      </Button>
      {disableReason && (
        <span className="ml-1 text-xs opacity-50">({disableReason})</span>
      )}
    </div>
  );
};
