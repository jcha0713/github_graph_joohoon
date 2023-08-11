import { mask } from "./draw"

function runShellCommands(command: string[]) {
  const proc = Bun.spawnSync(command)

  const stderr = proc.stderr.toString()
  const stdout = proc.stdout.toString()

  return Promise.all([stderr, stdout])
}

async function commit(date: Date) {
  const [stdout, stderr] = await runShellCommands([
    "git",
    "commit",
    "--date",
    date.toISOString(),
    "--allow-empty",
    "-m",
    date.toISOString(),
  ])

  console.log(stdout, stderr)
}

async function manageCommit() {
  const firstDay = new Date(2018, 0, 2)
  const lastDay = new Date(2018, 11, 32)
  const firstSunday2018 = new Date(2018, 0, 7, 0, 0, 0, 0)
  const lastSunday2018 = new Date(2018, 11, 29, 0, 0, 0, 0)

  let datePointer = firstDay

  console.log("first part start", datePointer)

  while (datePointer <= firstSunday2018) {
    await commit(datePointer)
    datePointer.setDate(datePointer.getDate() + 1)
  }

  console.log("first part end", datePointer)

  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      await commit(datePointer)
    }
    datePointer.setDate(datePointer.getDate() + 1)
  }

  console.log("middle part end", datePointer)

  while (datePointer > lastSunday2018 && datePointer <= lastDay) {
    await commit(datePointer)
    datePointer.setDate(datePointer.getDate() + 1)
    console.log(datePointer)
  }

  console.log("last part end", datePointer)
}

manageCommit()
