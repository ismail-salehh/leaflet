import { useState } from "react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import TextField from "../components/ui/TextField";
import Select from "../components/ui/Select";
import Stepper from "../components/ui/Stepper";
import Toggle from "../components/ui/Toggle";
import BottomSheet from "../components/ui/BottomSheet";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const ROOMS = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Hallway", "Office"];

// A playground page: it OWNS the state and passes it down to the components.
export default function HomePage() {
  // useState returns [currentValue, setterFunction].
  // TypeScript infers the type from the initial value (string, number, boolean).
  const [name, setName] = useState("");
  const [room, setRoom] = useState(ROOMS[0]);
  const [days, setDays] = useState(7);
  const [watered, setWatered] = useState(false);
  const [progress, setProgress] = useState(50);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="playground">
      <h1>UI playground</h1>

      <section>
        <h2>Button</h2>
        <div className="row">
          <Button onClick={() => alert("primary!")}>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section>
        <h2>Badge</h2>
        <div className="row">
          <Badge tone="success" label="Watered today" />
          <Badge tone="warning" label="Needs water" />
        </div>
      </section>

      <section>
        <h2>ProgressBar ({progress}%)</h2>
        <ProgressBar value={progress} />
        <div className="row">
          {/* Setter with a function: use it when the new value depends on the old one */}
          <Button variant="secondary" onClick={() => setProgress((p) => p - 10)}>−10</Button>
          <Button variant="secondary" onClick={() => setProgress((p) => p + 10)}>+10</Button>
        </div>
      </section>

      <section>
        <h2>Form fields</h2>
        <TextField label="Plant name" value={name} onChange={setName} placeholder="e.g. Peace Lily" />
        <Select label="Room" value={room} options={ROOMS} onChange={setRoom} />
        <Stepper value={days} onChange={setDays} unit="days" />
        <Toggle label="Watered today?" checked={watered} onChange={setWatered} />
        {/* Prove the state is live: */}
        <pre className="state">{JSON.stringify({ name, room, days, watered }, null, 2)}</pre>
      </section>

      <section>
        <h2>Overlays</h2>
        <div className="row">
          <Button onClick={() => setSheetOpen(true)}>Open bottom sheet</Button>
          <Button variant="warning" onClick={() => setDialogOpen(true)}>Open dialog</Button>
        </div>
      </section>

      {/* Everything between the tags becomes the "children" prop */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <h2>Monstera</h2>
        <Button variant="secondary" fullWidth>Edit plant</Button>
        <Button
          variant="warning"
          fullWidth
          onClick={() => {
            setSheetOpen(false);
            setDialogOpen(true);
          }}
        >
          Delete plant
        </Button>
        <Button variant="ghost" fullWidth onClick={() => setSheetOpen(false)}>Cancel</Button>
      </BottomSheet>

      <ConfirmDialog
        open={dialogOpen}
        title="Delete Monstera?"
        message="This will remove Monstera from your list. This can't be undone."
        confirmLabel="Delete plant"
        cancelLabel="Keep plant"
        onConfirm={() => setDialogOpen(false)}
        onCancel={() => setDialogOpen(false)}
      />
    </main>
  );
}
