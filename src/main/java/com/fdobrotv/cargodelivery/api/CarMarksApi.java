/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (7.2.0).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.fdobrotv.cargodelivery.api;

import com.fdobrotv.cargodelivery.dto.CarMark;
import com.fdobrotv.cargodelivery.dto.CarMarkIn;
import com.fdobrotv.cargodelivery.dto.Error;
import java.util.UUID;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
@Validated
@Tag(name = "carMarks", description = "the carMarks API")
public interface CarMarksApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * POST /carMarks : Create a car mark
     *
     * @param carMarkIn  (optional)
     * @return Ok (status code 201)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "createCarMark",
        summary = "Create a car mark",
        tags = { "carMarks" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Ok", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = CarMark.class))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/carMarks",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    
    default ResponseEntity<CarMark> createCarMark(
        @Parameter(name = "CarMarkIn", description = "") @Valid @RequestBody(required = false) CarMarkIn carMarkIn
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "null";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * DELETE /carMarks/{id} : Delete specific car by id
     *
     * @param id The id of the resource to delete (required)
     * @return Resource deleted successfully (status code 204)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "deleteCarMarkById",
        summary = "Delete specific car by id",
        tags = { "carMarks" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Resource deleted successfully"),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/carMarks/{id}",
        produces = { "application/json" }
    )
    
    default ResponseEntity<Void> deleteCarMarkById(
        @Parameter(name = "id", description = "The id of the resource to delete", required = true, in = ParameterIn.PATH) @PathVariable("id") UUID id
    ) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /carMarks/{id} : Info for a specific car mark
     *
     * @param id The id of the resource to retrieve (required)
     * @return Expected response to a valid request (status code 200)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "getCarMarkById",
        summary = "Info for a specific car mark",
        tags = { "carMarks" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Expected response to a valid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = CarMark.class))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/carMarks/{id}",
        produces = { "application/json" }
    )
    
    default ResponseEntity<CarMark> getCarMarkById(
        @Parameter(name = "id", description = "The id of the resource to retrieve", required = true, in = ParameterIn.PATH) @PathVariable("id") UUID id
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "null";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /carMarks : List all carMarks
     *
     * @param limit How many items to return at one time (max 100) (optional)
     * @return A paged array of car marks (status code 200)
     *         or unexpected error (status code 200)
     */
    @Operation(
        operationId = "listCarMarks",
        summary = "List all carMarks",
        tags = { "carMarks" },
        responses = {
            @ApiResponse(responseCode = "200", description = "A paged array of car marks", content = {
                @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CarMark.class)))
            }),
            @ApiResponse(responseCode = "default", description = "unexpected error", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/carMarks",
        produces = { "application/json" }
    )
    
    default ResponseEntity<List<CarMark>> listCarMarks(
        @Max(100) @Parameter(name = "limit", description = "How many items to return at one time (max 100)", in = ParameterIn.QUERY) @Valid @RequestParam(value = "limit", required = false) Integer limit
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "[ null, null, null, null, null ]";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

}
