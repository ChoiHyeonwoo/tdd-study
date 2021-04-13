package numberguessing.console;

import numberguessing.PositiveIntegerGenerator;

import java.util.stream.Stream;

public final class AppModel {
    private static final String NEW_LINE = System.lineSeparator();
    public static final String SELECT_MODE_MESSAGE = "1: Single player game" + NEW_LINE + "2: Multiplayer game" + NEW_LINE + "3: Exit"
            + NEW_LINE + "Enter selection: ";

    interface Processor {
        Processor run(String input);
    }

    private final PositiveIntegerGenerator generator;
    private boolean completed;
    private StringBuffer outputBuffer;
    private Processor processor;

    public AppModel(PositiveIntegerGenerator generator) {
        this.generator = generator;
        this.outputBuffer = new StringBuffer(SELECT_MODE_MESSAGE);
        completed = false;
        processor = this::processModeSelection;
    }

    public boolean isCompleted(){
        return completed;
    }

    public String flushOutput() {
        String output = outputBuffer.toString();
        outputBuffer.setLength(0);
        return output;
    }

    private Processor processModeSelection(String input) {
        if (input.equals("1")) {
            outputBuffer.append("Single player game" + NEW_LINE + "I'm thinking of a number between 1 and 100."
                    + NEW_LINE + "Enter your guess: ");
            int answer = generator.generateLessThanOrEqualToHundred();
            return getSinglePlayerGameProcessor(answer,1);
        } else if (input.equals("2")) {
            outputBuffer.append("Multiplayer game" + NEW_LINE + "Enter player names separated with commas: ");
            return getMultiplayerGameProcessor();
        } else {
            completed = true;
            return null;
        }
    }

    private Processor getMultiplayerGameProcessor() {
        return input -> {
            Object[] players = Stream.of(input.split(","))
                    .map(String::trim).toArray();
            outputBuffer.append("I'm thinking of a number between 1 and 100.");
            outputBuffer.append("Enter "+players[0]+"'s guess: ");
            return input2 -> {
                outputBuffer.append("Enter "+ players[1] +"'s guess: ");
                return input3 -> {
                    outputBuffer.append("Enter "+ players[2] +"'s guess: ");
                    return null;
                };
            };
        };
    }

    public void processInput(String input){
        processor = processor.run(input);
    }

    private Processor getSinglePlayerGameProcessor(int answer, int tries) {
        return input -> {
            int guess = Integer.parseInt(input);

            if (guess < answer) {
                outputBuffer.append("Your guess is too low." + NEW_LINE + "Enter your guess: ");
                return getSinglePlayerGameProcessor(answer,tries + 1);
            } else if (guess > answer) {
                outputBuffer.append("Your guess is too high." + NEW_LINE + "Enter your guess: ");
                return getSinglePlayerGameProcessor(answer,tries + 1);
            } else {
                outputBuffer.append("Correct! Done " + tries + (tries == 1 ? " guess." : " guesses.") + NEW_LINE + SELECT_MODE_MESSAGE);
                return this::processModeSelection;
            }
        };

    }
}
